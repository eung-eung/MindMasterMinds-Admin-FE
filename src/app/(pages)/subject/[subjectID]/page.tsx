"use client"

import UpdateSubject from "@/app/components/SubjectPage/UpdateSubject"

 
export default function Page({
    params: { subjectID }
  }: {
    params: { subjectID: string }
  }) {
  
  
  
    return (
      <section>
        <div>
          <UpdateSubject subjectID={subjectID} />
        </div>
      </section>
    )
  }
  