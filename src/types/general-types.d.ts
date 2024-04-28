export type DesktopNavType = {
	icon: JSX.Element;
	path: string;
	text: string;
};

export type MobileNavType = {
	icon: JSX.Element;
	path: string;
};

export type PostType = {
	id: number;
	content: string;
	image: {
		url: string;
		public_id: string;
	};
	owner: {
		username: string;
		avatar: {
			url: string;
			public_id: string;
		};
	};
	likes: number;
	createdAt: Date;
	updatedAt: Date;
	published: boolean;
	ownerId: string;
};

export type ProfileType = {
	avatar?: {
		url: string;
		public_id: string;
	};
	bio?: string;
	blueTick?: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	followers: number;
	friends: number;
	id: string;
	name: string;
	password: string;
	paymentId: any;
	posts: PostType[];
	private: boolean;
	tagList: any;
	username: string;
};

export type CommentType = {
	content: string;
	id: number;
	postId: number;
	user: { 
		username: string; 
		avatar: { 
			url: string; 
			public_id: string 
		} 
	};
	userId: string;
};
