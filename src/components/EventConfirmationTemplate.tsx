import { Tailwind, Section, Text } from '@react-email/components';

interface EmailTemplateProps {
  name?: string;
  email: string;
  eventName: string;
}

export function EventConfirmationTemplate({ name, email, eventName }: EmailTemplateProps) {
  return (
    <Tailwind>
      <Section className="w-full bg-white">
        <Text className="bg-blue-600 text-white text-center py-4 text-lg font-semibold">
          Zenith Events & Financial Consultancy
        </Text>

        <Section className="px-6 py-8">
          <Text className="text-base">
            {name && `Dear ${name}`}
          </Text>
          <Text className="text-base mt-3">
            You are registered!,
          </Text>

          <Text className="text-sm mt-4">
            Thank you for registering in "{eventName}"
          </Text>

          <Text className="text-sm mt-1">
            Please save this email for your records. And additionally if you have questions, just contact us at event@zefc.in.
          </Text>

          <Text className="text-sm mt-8">
            Warm regards,
            <br />
            <strong>Team Zenith</strong>
            <br />
            Zenith Events & Financial Consultancy
          </Text>
        </Section>
      </Section>
    </Tailwind>
  );
}
