import { Tailwind, Section, Text } from '@react-email/components';

interface EmailTemplateProps {
  name: string;
}

export function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <Tailwind>
      <Section className="w-full bg-white">
        <Text className="bg-blue-600 text-white text-center py-4 text-lg font-semibold">
          Zenith Events & Financial Consultancy
        </Text>

        <Section className="px-6 py-8">
          <Text className="text-base">
            Dear {name},
          </Text>

          <Text className="text-sm mt-4">
            Thank you for contacting Zenith Events & Financial Consultancy. We appreciate your interest in our services and are pleased to confirm that we have successfully received your enquiry.
          </Text>

          <Text className="text-sm mt-4">
            Our team will carefully review your request and get in touch with you as soon as possible. We are committed to providing timely assistance and ensuring that your requirements are addressed with the attention they deserve.
          </Text>

          <Text className="text-sm mt-4">
            Thank you for choosing Zenith Events & Financial Consultancy. We look forward to assisting you and building a valuable relationship with you.
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
