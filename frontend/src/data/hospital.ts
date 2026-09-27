export type Status = "normal" | "pending" | "critical" | "flagged" | "reviewed";

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "M" | "F";
  ward: string;
  bed: string;
  bloodGroup: string;
  admitted: string;
  condition: string;
  status: Status;
  vitals: { heart: number; spo2: number; temp: number; bp: string };
  organs: { heart: Status; lungs: Status; liver: Status; renal: Status; neuro: Status };
};

export const patients: Patient[] = [
  {
    id: "0412",
    name: "Mariam Okafor",
    age: 47,
    sex: "F",
    ward: "4C",
    bed: "12",
    bloodGroup: "O+",
    admitted: "12 Sep",
    condition: "Hypertensive crisis",
    status: "critical",
    vitals: { heart: 96, spo2: 94, temp: 37.8, bp: "168/102" },
    organs: { heart: "critical", lungs: "pending", liver: "normal", renal: "flagged", neuro: "normal" },
  },
  {
    id: "0398",
    name: "Rina Tanaka",
    age: 34,
    sex: "F",
    ward: "3A",
    bed: "04",
    bloodGroup: "A-",
    admitted: "18 Sep",
    condition: "Post-op observation",
    status: "normal",
    vitals: { heart: 72, spo2: 98, temp: 36.6, bp: "118/76" },
    organs: { heart: "normal", lungs: "normal", liver: "normal", renal: "normal", neuro: "normal" },
  },
  {
    id: "0421",
    name: "Lucia Duarte",
    age: 58,
    sex: "F",
    ward: "4C",
    bed: "09",
    bloodGroup: "B+",
    admitted: "20 Sep",
    condition: "Thyroid dysfunction",
    status: "flagged",
    vitals: { heart: 88, spo2: 97, temp: 37.1, bp: "132/84" },
    organs: { heart: "normal", lungs: "normal", liver: "flagged", renal: "normal", neuro: "pending" },
  },
  {
    id: "0376",
    name: "Sanjay Iyer",
    age: 61,
    sex: "M",
    ward: "2B",
    bed: "21",
    bloodGroup: "AB+",
    admitted: "09 Sep",
    condition: "Type 2 diabetes",
    status: "pending",
    vitals: { heart: 78, spo2: 96, temp: 36.9, bp: "140/88" },
    organs: { heart: "pending", lungs: "normal", liver: "normal", renal: "flagged", neuro: "normal" },
  },
  {
    id: "0433",
    name: "Tobi Adeyemi",
    age: 29,
    sex: "M",
    ward: "1A",
    bed: "07",
    bloodGroup: "O-",
    admitted: "21 Sep",
    condition: "Fractured tibia",
    status: "normal",
    vitals: { heart: 68, spo2: 99, temp: 36.5, bp: "120/78" },
    organs: { heart: "normal", lungs: "normal", liver: "normal", renal: "normal", neuro: "normal" },
  },
  {
    id: "0440",
    name: "Hélène Moreau",
    age: 72,
    sex: "F",
    ward: "4C",
    bed: "02",
    bloodGroup: "A+",
    admitted: "22 Sep",
    condition: "Pneumonia",
    status: "critical",
    vitals: { heart: 104, spo2: 89, temp: 38.4, bp: "104/64" },
    organs: { heart: "pending", lungs: "critical", liver: "normal", renal: "normal", neuro: "normal" },
  },
];

export type LabOrder = {
  id: string;
  panel: string;
  patientId: string;
  patient: string;
  collected: string;
  turnaround: string;
  status: Status;
};

export const labOrders: LabOrder[] = [
  { id: "L-9001", panel: "CBC — full", patientId: "0412", patient: "M. Okafor", collected: "07:10", turnaround: "1.2h", status: "critical" },
  { id: "L-9002", panel: "Lipid profile", patientId: "0398", patient: "R. Tanaka", collected: "07:40", turnaround: "2.0h", status: "normal" },
  { id: "L-9003", panel: "Thyroid TSH", patientId: "0421", patient: "L. Duarte", collected: "08:05", turnaround: "3.4h", status: "flagged" },
  { id: "L-9004", panel: "Glucose — fasting", patientId: "0376", patient: "S. Iyer", collected: "06:55", turnaround: "0.8h", status: "normal" },
  { id: "L-9005", panel: "Blood culture", patientId: "0440", patient: "H. Moreau", collected: "09:20", turnaround: "—", status: "pending" },
  { id: "L-9006", panel: "Troponin I", patientId: "0412", patient: "M. Okafor", collected: "10:02", turnaround: "0.6h", status: "critical" },
  { id: "L-9007", panel: "Urinalysis", patientId: "0433", patient: "T. Adeyemi", collected: "10:30", turnaround: "1.1h", status: "reviewed" },
];

export type Drug = {
  id: string;
  name: string;
  form: string;
  stock: number;
  reorderAt: number;
  unit: string;
  expiry: string;
  supplier: string;
};

export const drugs: Drug[] = [
  { id: "RX-101", name: "Amoxicillin 500mg", form: "Capsule", stock: 42, reorderAt: 120, unit: "caps", expiry: "04/2027", supplier: "Medifarm" },
  { id: "RX-102", name: "Paracetamol 1g", form: "Tablet", stock: 860, reorderAt: 200, unit: "tabs", expiry: "11/2027", supplier: "Corelab" },
  { id: "RX-103", name: "Insulin Glargine", form: "Pen", stock: 18, reorderAt: 30, unit: "pens", expiry: "02/2027", supplier: "Nordiq" },
  { id: "RX-104", name: "Atorvastatin 20mg", form: "Tablet", stock: 410, reorderAt: 150, unit: "tabs", expiry: "08/2028", supplier: "Medifarm" },
  { id: "RX-105", name: "Ceftriaxone 1g", form: "Vial", stock: 24, reorderAt: 60, unit: "vials", expiry: "01/2027", supplier: "Sterix" },
  { id: "RX-106", name: "Salbutamol Inhaler", form: "Inhaler", stock: 96, reorderAt: 40, unit: "units", expiry: "06/2027", supplier: "Respira" },
];

export type Prescription = {
  id: string;
  patient: string;
  drug: string;
  dose: string;
  prescriber: string;
  status: "dispensed" | "awaiting" | "on hold";
};

export const prescriptions: Prescription[] = [
  { id: "P-5501", patient: "M. Okafor", drug: "Amlodipine 10mg", dose: "1 od", prescriber: "Dr. Reyes", status: "awaiting" },
  { id: "P-5502", patient: "H. Moreau", drug: "Ceftriaxone 1g", dose: "1 bd IV", prescriber: "Dr. Shah", status: "dispensed" },
  { id: "P-5503", patient: "S. Iyer", drug: "Insulin Glargine", dose: "18u nocte", prescriber: "Dr. Reyes", status: "on hold" },
  { id: "P-5504", patient: "T. Adeyemi", drug: "Paracetamol 1g", dose: "1 qds", prescriber: "Dr. Nwosu", status: "dispensed" },
];

export type Invoice = {
  id: string;
  patient: string;
  service: string;
  amount: number;
  insurer: string;
  issued: string;
  status: "paid" | "pending" | "overdue" | "claim filed";
};

export const invoices: Invoice[] = [
  { id: "INV-3301", patient: "M. Okafor", service: "ICU · 2 nights", amount: 4820, insurer: "AXA Health", issued: "20 Sep", status: "claim filed" },
  { id: "INV-3302", patient: "R. Tanaka", service: "Laparoscopy", amount: 7350, insurer: "Self-pay", issued: "19 Sep", status: "paid" },
  { id: "INV-3303", patient: "S. Iyer", service: "Endocrine review", amount: 640, insurer: "Leadway", issued: "17 Sep", status: "overdue" },
  { id: "INV-3304", patient: "T. Adeyemi", service: "Orthopaedic cast", amount: 1180, insurer: "AXA Health", issued: "21 Sep", status: "pending" },
  { id: "INV-3305", patient: "H. Moreau", service: "Respiratory care", amount: 3260, insurer: "Hollard", issued: "22 Sep", status: "pending" },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  visits: number;
  area: string;
  fee: number;
  slots: string[];
  verified: boolean;
};

export const doctors: Doctor[] = [
  { id: "D-01", name: "Dr. Vikram Shah", specialty: "Internal Medicine", rating: 4.9, visits: 214, area: "Ikoyi · Lekki", fee: 120, slots: ["09:00", "10:30", "14:00", "16:00"], verified: true },
  { id: "D-02", name: "Dr. Amina Reyes", specialty: "Cardiology", rating: 4.8, visits: 167, area: "Victoria Island", fee: 180, slots: ["08:30", "11:00", "15:30"], verified: true },
  { id: "D-03", name: "Dr. Chidi Nwosu", specialty: "Paediatrics", rating: 5.0, visits: 302, area: "Yaba · Surulere", fee: 95, slots: ["10:00", "12:30", "17:00", "18:30"], verified: true },
  { id: "D-04", name: "Dr. Lena Fischer", specialty: "Physiotherapy", rating: 4.7, visits: 88, area: "Ikeja", fee: 70, slots: ["09:30", "13:00"], verified: false },
];

export const bloodGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] as const;
export type BloodGroup = (typeof bloodGroups)[number];

export const compatibility: Record<BloodGroup, { donate: BloodGroup[]; receive: BloodGroup[] }> = {
  "O-": { donate: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], receive: ["O-"] },
  "O+": { donate: ["O+", "A+", "B+", "AB+"], receive: ["O-", "O+"] },
  "A-": { donate: ["A-", "A+", "AB-", "AB+"], receive: ["O-", "A-"] },
  "A+": { donate: ["A+", "AB+"], receive: ["O-", "O+", "A-", "A+"] },
  "B-": { donate: ["B-", "B+", "AB-", "AB+"], receive: ["O-", "B-"] },
  "B+": { donate: ["B+", "AB+"], receive: ["O-", "O+", "B-", "B+"] },
  "AB-": { donate: ["AB-", "AB+"], receive: ["O-", "A-", "B-", "AB-"] },
  "AB+": { donate: ["AB+"], receive: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] },
};

export const admissionTrend = [
  { label: "Mon", value: 112 },
  { label: "Tue", value: 128 },
  { label: "Wed", value: 121 },
  { label: "Thu", value: 136 },
  { label: "Fri", value: 142 },
  { label: "Sat", value: 98 },
  { label: "Sun", value: 86 },
];

export const departmentLoad = [
  { label: "Cardiology", value: 86 },
  { label: "Paediatrics", value: 64 },
  { label: "Orthopaedics", value: 48 },
  { label: "Oncology", value: 39 },
  { label: "Maternity", value: 71 },
];

export const revenueMix = [
  { label: "Insurance claims", value: 168 },
  { label: "Self-pay", value: 74 },
  { label: "Corporate plans", value: 42 },
];
