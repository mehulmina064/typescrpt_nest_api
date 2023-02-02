export enum OPD_SERVICE_TYPE {
  CONSULTATION_OFFLINE = 'CONSULTATION_OFFLINE',
  CONSULTATION_ONLINE = 'CONSULTATION_ONLINE',
  DIAGNOSTICS_OFFLINE = 'DIAGNOSTICS_OFFLINE',
  DIAGNOSTICS_ONLINE = 'DIAGNOSTICS_ONLINE',
  MEDICINE = 'MEDICINE',
  EMOTIONAL_WELLBEING = 'EMOTIONAL_WELLBEING',
  DIET_NUTRITION = 'DIET_NUTRITION',
  HRA = 'HRA',
  HEALTH_COACH = 'HEALTH_COACH',
}

export const OPD_SERVICE_MAPPING = {
  CONSULTATION_OFFLINE: 'FACE_CONSULT_NO',
  CONSULTATION_ONLINE: 'TELE_VIDEO_DENTAL',
  DIAGNOSTICS_OFFLINE: 'PRES_DIAGNOSTIC',
  DIAGNOSTICS_ONLINE: 'PRES_DIAGNOSTIC',
  MEDICINE: 'PRES_MEDI',
  EMOTIONAL_WELLBEING: 'WELLNESS_WELLBEING',
  DIET_NUTRITION: 'DIET_NUTRITION',
  HRA: 'HRA_DIGITAL',
  HEALTH_COACH: 'HEALTH_COACH',
};

export const OPD_SERVICE_TEXT_MAPPING = {
  FACE_CONSULT_NO: 'Doctor Personal Visits',
  TELE_VIDEO_DENTAL: 'Tele/Video Consultations',
  PRES_DIAGNOSTIC: 'Diagnostic Tests Booking',
  PRES_MEDI: 'Medicine Order',
  WELLNESS_WELLBEING: 'Emotional Wellbeing',
  DIET_NUTRITION: 'Diet & Nutrition',
  HRA_DIGITAL: 'HRA Digital',
  HEALTH_COACH: 'Health Coach',
};

// export const OPD_SERVICE_TEXT_DESCRIPTION_MAPPING = {
//   FACE_CONSULT_NO: '{usageCount} consultations availed, {benefits} remaining.',
//   TELE_VIDEO_DENTAL:
//     '{usageCount} consultations availed, {benefits} remaining.',
//   PRES_DIAGNOSTIC:
//     'Rs.{totalDiscountAmount} saved as discounts in {usageCount} bookings.',
//   PRES_MEDI:
//     'Rs.{totalDiscountAmount} saved as discounts in {usageCount} orders.',
//   WELLNESS_WELLBEING:
//     '{usageCount} consultations availed, {benefits} remaining.',
//   DIET_NUTRITION: '{usageCount} consultations availed, {benefits} remaining.',
//   HRA_DIGITAL: '{usageCount} consultations availed, {benefits} remaining.',
//   HEALTH_COACH: '{usageCount} consultations availed, {benefits} remaining.',
// };

export const OPD_SERVICE_TEXT_DESCRIPTION_MAPPING = {
  FACE_CONSULT_NO: '{benefits} consultations \n {usageCount} availed.',
  TELE_VIDEO_DENTAL:
    '{benefits} consultations \n {usageCount} availed.',
  PRES_DIAGNOSTIC:
    'Discount applicable \n Rs.{totalDiscountAmount} saved as discounts.',
  PRES_MEDI:
    'Discount applicable \n Rs.{totalDiscountAmount} saved as discounts.',
  WELLNESS_WELLBEING:
    '{benefits} consultations \n {usageCount} availed.',
  DIET_NUTRITION: '{benefits} consultations \n {usageCount} availed.',
  HRA_DIGITAL: '{benefits} consultations \n {usageCount} consultations availed.',
  HEALTH_COACH: '{benefits} consultations \n {usageCount} consultations availed.',
};

export const OPD_PLAN_MAPPING = {
  faceConsultNo: 'consultationOffline',
  teleVideoDental: 'cousultationOnline',
  presDiagnostic: 'diagnostics',
  presMedi: 'medicine',
  wellnessWellbeing: 'emotionalWellbeing',
  healthCoach: 'healthCoach',
  hraDigital: 'hra',
  dietNutrition: 'dietNutrition',
};

export const OPD_SERVICE_PLAN_MAPPING = {
  consultationOffline: 'FACE_CONSULT_NO',
  cousultationOnline: 'TELE_VIDEO_DENTAL',
  diagnostics: 'PRES_DIAGNOSTIC',
  medicine: 'PRES_MEDI',
  emotionalWellbeing: 'WELLNESS_WELLBEING',
  healthCoach: 'HEALTH_COACH',
  hra: 'HRA_DIGITAL',
  dietNutrition: 'DIET_NUTRITION',
};
