"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Save, X, Camera } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Nguyen Van A",
    phone: "+84 123 456 789",
    email: "nguyen.vana@email.com",
    profileImage: "/vietnamese-person-profile.png",
  })

  const [editData, setEditData] = useState(profileData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditData((prev) => ({
          ...prev,
          profileImage: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground font-sans mt-2">Manage your personal information</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif">Profile Information</CardTitle>
                <CardDescription className="font-sans">Your personal details and contact information</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={handleEdit} className="font-sans">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="font-sans">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="font-sans bg-transparent">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={isEditing ? editData.profileImage : profileData.profileImage} alt="Profile" />
                  <AvatarFallback className="text-2xl font-serif">
                    {(isEditing ? editData.name : profileData.name)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">{isEditing ? editData.name : profileData.name}</h3>
                <p className="text-muted-foreground font-sans">Customer</p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="font-sans"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md font-sans">{profileData.name}</div>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-sans">
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="font-sans"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md font-sans">{profileData.phone}</div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="font-sans">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="font-sans"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md font-sans">{profileData.email}</div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-serif font-semibold mb-3">Account Information</h4>
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-muted-foreground font-sans">Member since:</span>
                  <span className="ml-2 font-sans">January 2024</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-sans">Total orders:</span>
                  <span className="ml-2 font-sans">12</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-sans">Loyalty points:</span>
                  <span className="ml-2 font-sans">245 points</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-sans">Preferred location:</span>
                  <span className="ml-2 font-sans">Ho Chi Minh City</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
