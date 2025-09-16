import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardBookProps {
  Icon: LucideIcon;
  bgColorIcon?: string;
  title: string;
  valueInfo: number;
}

export default function CardBook({
  Icon,
  bgColorIcon,
  title,
  valueInfo,
}: Readonly<CardBookProps>) {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center p-2.5 w-12 h-12 text-center rounded-xl ${bgColorIcon}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="font-bold text-[16px]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-right text-2xl font-bold">{valueInfo}</p>
      </CardContent>
    </Card>
  );
}
