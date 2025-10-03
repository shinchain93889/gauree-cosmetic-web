// Virtual Makeup Try-On Flow
'use server';

/**
 * @fileOverview A virtual makeup try-on AI agent.
 *
 * - virtualMakeupTryOn - A function that handles the virtual makeup try-on process.
 * - VirtualMakeupTryOnInput - The input type for the virtualMakeupTryOn function.
 * - VirtualMakeupTryOnOutput - The return type for the virtualMakeupTryOn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const VirtualMakeupTryOnInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  makeupStyle: z.string().describe('The desired makeup style to try on.'),
});
export type VirtualMakeupTryOnInput = z.infer<typeof VirtualMakeupTryOnInputSchema>;

const VirtualMakeupTryOnOutputSchema = z.object({
  modifiedPhotoDataUri: z
    .string()
    .describe(
      'A photo of the user with the applied makeup, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Removed URL escaping of single quotes
    ),
  description: z.string().describe('The description of the applied makeup.'),
});
export type VirtualMakeupTryOnOutput = z.infer<typeof VirtualMakeupTryOnOutputSchema>;

export async function virtualMakeupTryOn(input: VirtualMakeupTryOnInput): Promise<VirtualMakeupTryOnOutput> {
  return virtualMakeupTryOnFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualMakeupTryOnPrompt',
  input: {schema: VirtualMakeupTryOnInputSchema},
  output: {schema: VirtualMakeupTryOnOutputSchema},
  prompt: [
    {
      text: `Apply the following makeup style to the user's photo: {{{makeupStyle}}}. Return the modified image and a description of the applied makeup.`,
    },
    {
      media: {url: '{{photoDataUri}}'},
    },
  ],
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const virtualMakeupTryOnFlow = ai.defineFlow(
  {
    name: 'virtualMakeupTryOnFlow',
    inputSchema: VirtualMakeupTryOnInputSchema,
    outputSchema: VirtualMakeupTryOnOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      prompt: [
        {
          text: `Apply the following makeup style to the user's photo: ${input.makeupStyle}. Return the modified image and a description of the applied makeup.`,
        },
        {
          media: {url: input.photoDataUri},
        },
      ],
      model: 'googleai/gemini-2.5-flash-image-preview',
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!output?.media?.url) {
      throw new Error('No image was generated.');
    }

    return {
      modifiedPhotoDataUri: output.media.url,
      description: output.text ?? 'Virtual makeup applied.',
    };
  }
);
