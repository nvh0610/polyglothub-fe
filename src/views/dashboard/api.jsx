import axios from "axios";
import { HOST_API } from "../../constants/PathUri";

const API_URL = `${HOST_API}/flashcard-daily/dashboard`;

export const fetchDashboard = async ({ limit, page, start_date, end_date }) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { limit, page, start_date, end_date },
    });


    if (!response.data || !response.data.data) {
      console.error("API returned an unexpected response:", response.data);
      return { pagination: {}, report: [] };
    }

    return {
      pagination: response.data.data.pagination || {},
      report: response.data.data.report || [],
    };
  } catch (error) {
    console.error("Error fetching report:", error);
    return { pagination: {}, report: [] };
  }
};
