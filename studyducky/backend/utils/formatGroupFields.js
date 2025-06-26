const enumMap = {
	// StudyGroup fields
	calls: {
		"Just having presence/accountability": "presence",
		"Occasional discussion": "occasional",
		"Daily Check Ins": "checkins",
	},
	when: {
		"Morning (7AM - 12PM)": "morn",
		"Afternoon (12PM - 6PM)": "aftn",
		"Evening (6PM onwards)": "eve",
	},
	notes: {
		Yes: "yes",
		No: "no",
	},
	VSR: {
		Daily: "daily",
		"Few times a week": "few times",
		"Only near exams": "exams",
	},
	duration: {
		"Less than 1 hour": "less than 1",
		"1-2 hours": "1-2",
		"2 hours and above": "2",
	},

	// ProjectGroup fields
	tutorial: {
		"Tutorial 1": "T1",
		"Tutorial 2": "T2",
		"Tutorial 3": "T3",
	},
	commitment: {
		"1 - Very light": "1",
		"2": "2",
		"3 - Moderate": "3",
		"4": "4",
		"5 - Very intense": "5",
	},
	meeting: {
		"Morning (7AM - 12PM)": "morn",
		"Afternoon (12PM - 6PM)": "aftn",
		"Evening (6PM onwards)": "eve",
	},
	pace: {
		"Start early": "early",
		"Balanced pace": "balanced",
		"Cram last week": "cram",
	},
};

export function normalizeGroupFields(body) {
	const normalized = { ...body };

	for (const [key, value] of Object.entries(normalized)) {
		if (enumMap[key] && enumMap[key][value]) {
			normalized[key] = enumMap[key][value];
		}
	}

	return normalized;
}