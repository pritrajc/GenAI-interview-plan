const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/* ---------------------- Zod Schema ---------------------- */

const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  technicalQuestion: z.array(
    z.object({
      question: z.string(),
      intension: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intension: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
  title: z.string().describe("The title of the job for which the intreview report is generated")
});

/* ---------------------- Gemini JSON Schema ---------------------- */

const interviewReportJsonSchema = {
  type: "object",

  properties: {
    matchScore: {
      type: "number",
      description:
        "Overall match score between the candidate and the job description."
    },

    technicalQuestion: {
      type: "array",
      description: "Technical interview questions.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Technical interview question."
          },
          intension: {
            type: "string",
            description: "Reason interviewer asks this question."
          },
          answer: {
            type: "string",
            description: "Ideal answer."
          }
        },
        required: [
          "question",
          "intension",
          "answer"
        ]
      }
    },

    behavioralQuestions: {
      type: "array",
      description: "Behavioral interview questions.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string"
          },
          intension: {
            type: "string"
          },
          answer: {
            type: "string"
          }
        },
        required: [
          "question",
          "intension",
          "answer"
        ]
      }
    },

    skillGaps: {
      type: "array",
      description: "Missing skills.",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string"
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"]
          }
        },
        required: [
          "skill",
          "severity"
        ]
      }
    },

    preparationPlan: {
      type: "array",
      description: "7-day preparation plan.",
      items: {
        type: "object",
        properties: {
          day: {
            type: "number"
          },
          focus: {
            type: "string"
          },
          tasks: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "day",
          "focus",
          "tasks"
        ]
      }
    }
  },

  required: [
    "matchScore",
    "technicalQuestion",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan"
  ]
};

/* ---------------------- Generate Report ---------------------- */

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
You are an expert technical interviewer.

Analyze the candidate carefully.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT:

Return ONLY valid JSON.

Do not return markdown.

Do not wrap JSON inside \`\`\`.

Follow the JSON schema exactly.

Requirements:

1. matchScore must be between 0 and 100.

2. technicalQuestion:
Generate 6 technical interview questions.

Each item must contain:
- question
- intension
- answer

3. behavioralQuestions:
Generate 4 behavioral interview questions.

Each item must contain:
- question
- intension
- answer

4. skillGaps:
Return at least 3 skill gaps.

Each item must contain:
- skill
- severity

5. preparationPlan:
Generate a complete 7-day preparation plan.

Each day must contain:
- day
- focus
- tasks (minimum 3 tasks)
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: interviewReportJsonSchema,
      },
    });

    console.log("\n========== RAW RESPONSE ==========\n");
    console.log(response.text);

    const json = JSON.parse(response.text);

    const result = interviewReportSchema.safeParse(json);

    if (!result.success) {
      console.log("\n========== VALIDATION FAILED ==========\n");
      console.dir(result.error.format(), {
        depth: null,
      });

      return null;
    }

    console.log("\n========== VALID REPORT ==========\n");

    console.dir(result.data, {
      depth: null,
    });

    return result.data;

  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = generateInterviewReport;