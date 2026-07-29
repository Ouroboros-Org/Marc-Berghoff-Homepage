"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion.Root className="faq" type="single" collapsible>
      {items.map((item, index) => (
        <Accordion.Item
          value={`item-${index}`}
          className="faq__item"
          key={item.question}
        >
          <Accordion.Header>
            <Accordion.Trigger className="faq__trigger">
              <span>{item.question}</span>
              <Plus aria-hidden="true" className="faq__icon" size={20} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq__content">
            <div>{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
