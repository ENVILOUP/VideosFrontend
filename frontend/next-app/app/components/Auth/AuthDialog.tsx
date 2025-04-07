"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { LogIn } from "lucide-react"
import LoginSection from "./LoginSection"
import RegisterSection from "./RegisterSection"

export function AuthDialog() {
	const [activeTab, setActiveTab] = useState("login")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 transition-colors duration-300 flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          <span>Войти</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-y-auto max-h-screen pt-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-row w-full rounded-none">
            <TabsTrigger
              value="login"
							className="py-4 data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Вход
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="py-4 data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Регистрация
            </TabsTrigger>
          </TabsList>

          <div className="px-6 py-2 pb-4">
            <TabsContent value="login" className="mt-0">
              <LoginSection />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <RegisterSection onRegisterSuccess={() => setActiveTab("login")}/>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

