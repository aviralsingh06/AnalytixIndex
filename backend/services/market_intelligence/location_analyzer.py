from collections import Counter

from utils.market_data.market_database import MARKET_DATABASE


class LocationAnalyzer:
    """
    Analyzes hiring demand across locations
    and employment types.
    """

    @staticmethod
    def analyze():

        location_counter = Counter()

        employment_counter = Counter()

        total_jobs = len(MARKET_DATABASE)

        # ----------------------------------
        # Count Locations & Employment Types
        # ----------------------------------

        for job in MARKET_DATABASE:

            location_counter.update(
                [job["location"]]
            )

            employment_counter.update(
                [job["employment_type"]]
            )

        # ----------------------------------
        # Top Locations
        # ----------------------------------

        top_locations = []

        for location, openings in location_counter.most_common():

            hiring_percentage = round(
                (openings / total_jobs) * 100,
                2,
            )

            top_locations.append(

                {

                    "location": location,

                    "openings": openings,

                    "hiring_percentage": hiring_percentage,

                }

            )

        # ----------------------------------
        # Employment Types
        # ----------------------------------

        remote_jobs = employment_counter.get(
            "Remote",
            0,
        )

        onsite_jobs = employment_counter.get(
            "Onsite",
            0,
        )

        hybrid_jobs = employment_counter.get(
            "Hybrid",
            0,
        )

        return {

            "total_jobs": total_jobs,

            "remote_jobs": remote_jobs,

            "onsite_jobs": onsite_jobs,

            "hybrid_jobs": hybrid_jobs,

            "top_locations": top_locations,

        }