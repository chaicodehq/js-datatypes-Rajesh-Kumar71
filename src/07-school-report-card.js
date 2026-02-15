/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if (typeof student !== "object" || student === null || Array.isArray(student)){return null;}

  if (typeof student.name !== "string" || student.name.trim() === "") { return null;}

  const marks = student.marks;

  if (typeof marks !== "object" || marks === null || Array.isArray(marks)){return null;}

  const subjects = Object.keys(marks);
  if (subjects.length ===  0){return null;}

  for (const subject of subjects){
    const mark = marks[subject];
    if (typeof mark !== "number" || !Number.isFinite(mark) || mark < 0 || mark > 100){return null;}
  }

  const values = Object.values(marks);

  const totalMarks = values.reduce((sum, m) => sum + m, 0);

  const percentageRaw = (totalMarks / (subjects.length * 100)) * 100;
  const percentage = parseFloat(percentageRaw.toFixed(2));

  let grade = "F";

  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";

  const entries = Object.entries(marks);
  let highestSubject = entries[0][0];
  let lowestSubject = entries[0][0];

  for (let i = 1; i < entries.length; i++){
    const [sub, mark] = entries[i];
    if (mark > marks[highestSubject]) highestSubject = sub;
    if (mark < marks[lowestSubject]) lowestSubject = sub;
  }

  const passedSubjects = entries.filter(([, m]) => m >= 40).map(([s]) => s);
  const failedSubjects = entries.filter(([, m]) => m < 40).map(([s]) => s);

  return {
    name: student.name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount: subjects.length,
  };
}

