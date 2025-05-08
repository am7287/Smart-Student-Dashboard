
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentProgressCard from '../components/Parent/StudentProgressCard';
import AuthGuard from '../components/Auth/AuthGuard';

const MOCK_STUDENTS = [
  {
    id: 1,
    name: "Alice Johnson",
    subjects: [
      { name: "Mathematics", progress: 78, score: 82, grade: "B+" },
      { name: "Physics", progress: 65, score: 70, grade: "B-" },
      { name: "Chemistry", progress: 92, score: 94, grade: "A" }
    ],
    weeklyReport: {
      attendance: "95%",
      completedAssignments: 8,
      totalAssignments: 10,
      improvements: ["Active class participation", "Excellent homework completion"],
      areasOfFocus: [
        "Need more practice in Physics",
        "Practice more complex algebra problems to improve math scores", 
        "Review physics concepts regularly to strengthen fundamentals"
      ]
    },
    upcomingAssignments: [
      { title: "Math Assignment #12", subject: "Mathematics", due: "Tomorrow", status: "pending" },
      { title: "Physics Lab Report", subject: "Physics", due: "Next Week", status: "pending" },
      { title: "Chemistry Quiz Prep", subject: "Chemistry", due: "Friday", status: "pending" }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    subjects: [
      { name: "Mathematics", progress: 85, score: 88, grade: "B+" },
      { name: "Physics", progress: 72, score: 75, grade: "C+" },
      { name: "Chemistry", progress: 88, score: 90, grade: "A-" }
    ],
    weeklyReport: {
      attendance: "88%",
      completedAssignments: 7,
      totalAssignments: 10,
      improvements: ["Improved test scores", "Better class engagement"],
      areasOfFocus: [
        "Regular attendance needed", 
        "More focus on Physics",
        "Join the physics study group to improve understanding",
        "Set aside time for daily practice problems in physics"
      ]
    },
    upcomingAssignments: [
      { title: "Chemistry Project", subject: "Chemistry", due: "Friday", status: "pending" },
      { title: "Math Problems Set", subject: "Mathematics", due: "Next Monday", status: "pending" }
    ]
  },
  {
    id: 3,
    name: "Carol White",
    subjects: [
      { name: "Mathematics", progress: 92, score: 95, grade: "A" },
      { name: "Physics", progress: 88, score: 89, grade: "B+" },
      { name: "Chemistry", progress: 95, score: 96, grade: "A+" }
    ],
    weeklyReport: {
      attendance: "98%",
      completedAssignments: 10,
      totalAssignments: 10,
      improvements: ["Consistent high performance", "Great problem-solving skills"],
      areasOfFocus: [
        "Challenge with advanced topics",
        "Consider advanced math challenges to maintain engagement",
        "Explore physics competitions to apply theoretical knowledge"
      ]
    },
    upcomingAssignments: [
      { title: "Physics Problem Set", subject: "Physics", due: "Wednesday", status: "pending" },
      { title: "Advanced Math Challenge", subject: "Mathematics", due: "Next Thursday", status: "pending" }
    ]
  },
  {
    id: 4,
    name: "David Brown",
    subjects: [
      { name: "Mathematics", progress: 68, score: 72, grade: "C+" },
      { name: "Physics", progress: 75, score: 78, grade: "C+" },
      { name: "Chemistry", progress: 83, score: 86, grade: "B" }
    ],
    weeklyReport: {
      attendance: "92%",
      completedAssignments: 6,
      totalAssignments: 10,
      improvements: ["Better class participation", "Improved homework submission"],
      areasOfFocus: [
        "Need to improve Math scores", 
        "More practice needed",
        "Attend math tutoring sessions to improve foundational skills",
        "Create a structured study plan for mathematics"
      ]
    },
    upcomingAssignments: [
      { title: "Chemistry Lab Work", subject: "Chemistry", due: "Friday", status: "pending" },
      { title: "Math Remedial Assignment", subject: "Mathematics", due: "Tomorrow", status: "pending" }
    ]
  },
  {
    id: 5,
    name: "Emma Davis",
    subjects: [
      { name: "Mathematics", progress: 95, score: 97, grade: "A+" },
      { name: "Physics", progress: 90, score: 92, grade: "A-" },
      { name: "Chemistry", progress: 94, score: 95, grade: "A" }
    ],
    weeklyReport: {
      attendance: "96%",
      completedAssignments: 9,
      totalAssignments: 10,
      improvements: ["Outstanding performance", "Great analytical skills"],
      areasOfFocus: [
        "Can attempt more challenging problems",
        "Explore research opportunities in mathematics or physics",
        "Consider mentoring other students to deepen understanding"
      ]
    },
    upcomingAssignments: [
      { title: "Advanced Physics Research", subject: "Physics", due: "Next Tuesday", status: "pending" },
      { title: "Math Competition Prep", subject: "Mathematics", due: "Next Friday", status: "pending" }
    ]
  },
  {
    id: 6,
    name: "Frank Miller",
    subjects: [
      { name: "Mathematics", progress: 76, score: 79, grade: "C+" },
      { name: "Physics", progress: 62, score: 65, grade: "D" },
      { name: "Chemistry", progress: 71, score: 74, grade: "C" }
    ],
    weeklyReport: {
      attendance: "85%",
      completedAssignments: 5,
      totalAssignments: 10,
      improvements: ["Showing interest in practical work"],
      areasOfFocus: [
        "Regular attendance needed", 
        "More focus on assignments", 
        "Extra support in Physics",
        "Schedule regular physics tutoring to address knowledge gaps",
        "Use interactive learning tools to improve physics understanding"
      ]
    },
    upcomingAssignments: [
      { title: "Physics Remedial Work", subject: "Physics", due: "Tomorrow", status: "pending" },
      { title: "Chemistry Make-up Quiz", subject: "Chemistry", due: "Thursday", status: "pending" },
      { title: "Math Review Session", subject: "Mathematics", due: "Wednesday", status: "pending" }
    ]
  }
];

const ParentPortal = () => {
  return (
    <AuthGuard allowedRoles={['parent']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Parent Portal" 
            subtitle="Monitor your children's academic progress"
          />
          
          <div className="grid grid-cols-1 gap-6">
            {MOCK_STUDENTS.map((student) => (
              <StudentProgressCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default ParentPortal;
