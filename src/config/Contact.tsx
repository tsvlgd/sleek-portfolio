export const contactConfig = {
  title: 'Contact',
  description:
    'Tell me what you are building. If it has a backend, an LLM in the loop, or both, I would like to hear about it.',
  form: {
    labels: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
    },
    placeholders: {
      name: 'Your name',
      email: 'you@company.com',
      message: 'What are you working on?',
    },
    submitIdle: 'Send message',
    submitPending: 'Sending…',
    successMessage: 'Got it. I will reply shortly.',
    errorMessage: 'Something went wrong. Email me directly instead.',
  },
};
