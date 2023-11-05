/* 
https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=client-component

Creating a Supabase client with the ssr package 
automatically configures it touse cookies. 
This means your user's session is available
throughout the entire Next.js stack - client, server, App Router, Pages Router. It just works!
 */

"use client";

import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )