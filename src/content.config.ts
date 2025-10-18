/**
 * Content Collections Configuration
 *
 * Defines the schema and validation rules for all content collections in the site.
 * Content collections are structured markdown/MDX files that Astro processes and validates.
 *
 * Uses Zod for type-safe schema validation.
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Home Collection
 *
 * Contains the homepage content and configuration
 * File: src/content/home/-index.md
 */
const home = defineCollection({
  // Loads the -index.md file from src/content/home/
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: z.object({
    logoPath: z.string().optional(),  // Path to logo image in public folder (e.g., "/assets/logo.svg")
    title: z.string(),                 // Page title
    content: z.string(),               // Hero/banner content text
    button: z
      .object({
        label: z.string(),             // Button text
        link: z.string().optional(),   // Button destination URL
      })
      .optional(),                     // Button is optional
  }),
});

/**
 * Reusable Schema: Searchable Content
 *
 * Common schema for pages that should be indexed/searchable.
 * Used by multiple collections to avoid repeating the same field definitions.
 *
 * DRY (Don't Repeat Yourself) pattern for content collections.
 */
const searchable = z.object({
  title: z.string(),                            // Required: Page title
  description: z.string().optional(),           // Optional: Page description/summary
  autodescription: z.boolean().default(true),   // Auto-generate description from content if not provided
  draft: z.boolean().default(false),            // If true, hide this page from production
});

/**
 * Terms Collection
 *
 * Terms of Service, Privacy Policy, and legal pages
 * File: src/content/terms/-index.md
 */
const terms = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/terms" }),
  schema: searchable,  // Uses the reusable searchable schema defined above
});

/**
 * Reset Email Collection
 *
 * Password/email reset instructions and related pages
 * File: src/content/reset-email/-index.md
 */
const resetEmail = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/reset-email" }),
  schema: searchable,  // Uses the reusable searchable schema defined above
});

/**
 * What We Offer Collection
 *
 * Services and offerings catalog
 * File: src/content/what-we-offer/-index.md
 */
const whatWeOffer = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/what-we-offer" }),
  schema: z.object({
    title: z.string(),                    // Section title
    description: z.string().optional(),   // Section description
    offerings: z.array(                   // Array of service offerings
      z.object({
        title: z.string(),                // Offering title (e.g., "Streaming Services")
        description: z.string(),          // Offering description
        icon: z.string().optional(),      // Path to category icon
        brandIcons: z.array(z.string()).optional(),  // Array of brand logo paths
      })
    ),
  }),
});

/**
 * Export all collections
 *
 * These collections are used throughout the site via:
 * - getEntry(collection, id)
 * - getCollection(collection)
 * - CollectionEntry<"collection-name"> types
 */
export const collections = {
  home,
  terms,
  "reset-email": resetEmail,
  "what-we-offer": whatWeOffer,
};