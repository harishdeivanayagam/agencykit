'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginUser, verifyOTP } from './actions'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { PiSpinner } from 'react-icons/pi'

export default function LoginPage() {
  const [showOTP, setShowOTP] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm()
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (!showOTP) {
        const result = await loginUser(data.email)
        if (result.success) {
          setShowOTP(true)
          toast({
            title: "OTP Sent",
            description: "Please check your email for the OTP.",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to send OTP. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        const result = await verifyOTP(data.email, data.otp)
        if (result.success) {
          toast({
            title: "Success",
            description: "You have successfully logged in.",
          })
          router.push('/console/dashboard')
        } else {
          toast({
            title: "Error",
            description: "Invalid OTP. Please try again.",
            variant: "destructive",
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showOTP && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter OTP" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
          {showOTP ? 'Verify OTP' : 'Send Magic Link'}
        </Button>
      </form>
    </Form>
  )
}
