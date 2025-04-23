
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StudentCardProps {
  name: string;
  course: string;
  progress: number;
  grade: string;
}

const StudentCard = ({ name, course, progress, grade }: StudentCardProps) => {
  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">Course</p>
            <p className="text-sm font-medium">{course}</p>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Current Grade</p>
            <p className="text-2xl font-bold">{grade}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
