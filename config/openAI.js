const OpenAI = require("openai");

const test = async () => {
  const openai = new OpenAI({
    apiKey: "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",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          'Generate an appointment for a patient based on the given data. The patient wants to schedule an appointment with a doctor represented by a doctorId. The appointment should be on a specific day and time, and the duration of the appointment should be within the doctor\'s availability. If the requested doctor is not available, suggest an alternative doctor with the same specialty and the least wait time.\n\nAppointment JSON:\n[ \n  { "patientId": "yourPatientId", "doctorId": "doc789", "day": "Tuesday", "startTime": "18:00", "endTime": "18:15", "duration": 15 } \n]\n\nDoctors List JSON:\n[ \n  { "id": "doc123", "name": "Dr. Smith", "maxAppointmentsPerDay": 10, "availability": [ { "day": "Monday", "startTime": "09:00 AM", "endTime": "05:00 PM" }, { "day": "Wednesday", "startTime": "01:00 PM", "endTime": "08:00 PM" } ], "specialty": "Cardiology", "scheduledAppointments": [ { "patientId": "pat456", "dateTime": "2023-12-18T10:30:00", "duration": 30 } ], "equipmentRequirements": [ "ECG Machine", "Blood Pressure Monitor" ], "feedback": [ "Excellent bedside manner", "Prompt and efficient service" ] },\n  // ... (Include other doctor objects)\n]\n\ngive the result in json',
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.choices[0].message);
};

test();
