import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
	const navigate = useNavigate();
    
    const checkToken = async () => {
        const token = Cookies.get("token");

		try {
			const checkResp = await fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (checkResp.status === 200) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	};

    async function checkAndRedirect() {
        const isLoggedIn = await checkToken();
        if (!isLoggedIn) {
            navigate("/signin?redirect=" + window.location.pathname);
        }
    }

	useEffect(() => {
		checkAndRedirect();
    }, []);

	return <> {children} </>;
}
