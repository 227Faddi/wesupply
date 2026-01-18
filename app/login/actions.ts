'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Signup error:', error)
    redirect('/error')
  }

  if (data.user) {
    try {
      await prisma.user.create({
        data: {
          email: data.user.email!,
          authId: data.user.id,
        },
      })
    } catch (dbError) {
      console.error('Database user creation error:', dbError)
      // Note: User is created in Auth but failed in DB. 
      // In production, you might want to rollback or handle this more gracefully.
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
