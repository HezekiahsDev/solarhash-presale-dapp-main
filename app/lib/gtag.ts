export const GA_MEASUREMENT_ID = "G-KRH4SSNC9Y"; // Replace with your GA4 ID

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// Call this function to log an event
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
