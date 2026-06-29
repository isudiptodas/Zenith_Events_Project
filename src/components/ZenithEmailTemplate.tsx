import { Tailwind, Section, Text } from '@react-email/components';

interface ZenithEmailProps {
  name: string;
  email: string;
  contact: string;
  message: string;
}

export function ZenithEmailTemplate({ name, email, contact, message }: ZenithEmailProps) {
  return (
    <Tailwind>
      <Section className="w-full bg-white">
        <Text className="bg-blue-600 text-white text-center py-4 text-lg font-semibold">
          Zenith Events & Financial Consultancy
        </Text>

        <Section className="px-6 py-8">
          <Text className="text-sm">
            Name: {name},
          </Text>
          <Text className="text-sm">
            Email: {email}
          </Text>
          <Text className="text-sm">
            Contact: {contact}
          </Text>
          <Text className="text-sm">
            Message: {message}
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
