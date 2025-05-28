import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { faqs } from "@/assets/staticData";
import Lottie from "lottie-react";
import faqAnimation from "@/assets/lottie/faq.json";

function FAQ() {
  return (
    <div className="w-full p-8">
      <h1 className="text-3xl font-bold text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Find answers to common questions below. Still have questions? Feel free
        to contact us.
      </p>

      <div className="flex items-center justify-between">
        <div className="w-1/2 flex justify-center py-10 ">
          <Accordion type="single" collapsible className="w-full max-w-2xl ">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Lottie
            animationData={faqAnimation}
            loop={true}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FAQ;
