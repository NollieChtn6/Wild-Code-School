export type Launch = {
	id: string;
	launch_date_utc: string;
	launch_success: boolean;
	rocket: {
		rocket_name: string;
	};
	links: {
		video_link: string;
	};
	details: string;
};
