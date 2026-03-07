import React from "react";

type User = {
	firstname?: string;
	lastname?: string;
	email?: string;
	image?: string | null;
};

export default function Navbar({ user }: { user?: User }) {
	const displayName = user?.firstname || user?.email || null;

	return (
		<header className="we-navbar">
			<div className="we-navbar-inner">
				<div className="we-left">
					<img src="/logos/icon.png" alt="W-EB logo" className="we-logo" />
					<div className="we-title">W-EB - Az állatok otthonkeresője</div>
				</div>

				<nav className="we-nav">
					<button className="we-btn">Főoldal</button>
					<button className="we-btn">Kutyák</button>
					<button className="we-btn">Macskák</button>
				</nav>

				<div className="we-right">
					<div className="we-divider" aria-hidden="true" />
					{displayName ? (
						<div className="we-user">
							{user?.image ? (
								<img src={user.image} alt={displayName ?? "avatar"} className="we-avatar" />
							) : null}
							<span className="we-username">{displayName}</span>
						</div>
					) : (
						<button className="we-auth">Bejelentkezés</button>
					)}
				</div>
			</div>
		</header>
	);
}

