'use server';

import {
  virtualMakeupTryOn,
  type VirtualMakeupTryOnInput,
  type VirtualMakeupTryOnOutput
} from '@/ai/flows/virtual-makeup-try-on';

type ActionResult = 
  | { success: true; data: VirtualMakeupTryOnOutput }
  | { success: false; error: string };

export async function applyMakeup(input: VirtualMakeupTryOnInput): Promise<ActionResult> {
  try {
    // Basic validation
    if (!input.photoDataUri || !input.makeupStyle) {
        return { success: false, error: 'Photo and makeup style are required.' };
    }
    const result = await virtualMakeupTryOn(input);
    if (!result.modifiedPhotoDataUri) {
        return { success: false, error: 'The AI could not generate an image. Please try a different photo or style.' };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in applyMakeup server action:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}
