import React from 'react'

export const metadata = {
    title: 'Profile : Task Manager',
    description: 'View your profile here',
  }

export default function ProfileLayout({children}) {
  return (
    <div>{children}</div>
  )
}