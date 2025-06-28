import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const semesterList = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
];

const defaultNilai = {
  "Agama Hindu": 0,
  "Pendidikan Pancasila": 0,
  "Bahasa Indonesia": 0,
  "Matematika": 0,
  "Bahasa Inggris": 0,
  "Pendidikan Jasmani": 0,
  "Sejarah": 0,
  "Seni Budaya": 0,
  "Muatan Lokal": 0,
  "Biologi": 0,
  "Kimia": 0,
  "Matematika Tingkat Lanjut": 0,
  "Ekonomi": 0,
};

export default function NilaiEditor() {
  const [semester, setSemester] = useState("Semester 3");
  const [semuaNilai, setSemuaNilai] = useState({ [semester]: { ...defaultNilai } });

  const nilai = semuaNilai[semester] || { ...defaultNilai };

  const handleChange = (mapel, value) => {
    setSemuaNilai({
      ...semuaNilai,
      [semester]: {
        ...nilai,
        [mapel]: parseFloat(value) || 0,
      },
    });
  };

  const rataRata =
    Object.values(nilai).reduce((acc, curr) => acc + curr, 0) /
    Object.values(nilai).length;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">REKAP NILAI RAPORT PRIBADI</h1>

      <div className="mb-6 flex justify-center">
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[220px]">
            <span>{semester}</span>
          </SelectTrigger>
          <SelectContent>
            {semesterList.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(nilai).map(([mapel, value]) => (
          <Card key={mapel} className="shadow-md border border-blue-100">
            <CardContent className="p-5">
              <p className="font-bold text-sm text-gray-700 mb-2">{mapel}</p>
              <Input
                type="number"
                value={value}
                onChange={(e) => handleChange(mapel, e.target.value)}
                className="w-full border-blue-300 focus:ring-2 focus:ring-blue-500"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-xl font-bold text-center text-green-700">
        RATA-RATA NILAI: {rataRata.toFixed(2)}
      </div>
    </main>
  );
}
