import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaUsers,
  FaThLarge,
  FaTh,
} from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const ITEMS_PER_PAGE = 6;

const AvailableCamp = () => {
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["availableCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/camps");
      return data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCamps = useMemo(() => {
    return camps.filter((camp) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        camp.campName.toLowerCase().includes(searchStr) ||
        camp.location.toLowerCase().includes(searchStr) ||
        camp.healthCare.toLowerCase().includes(searchStr) ||
        camp.dateTime.toLowerCase().includes(searchStr)
      );
    });
  }, [camps, searchTerm]);

  const sortedCamps = useMemo(() => {
    let sorted = [...filteredCamps];

    if (sortOption === "mostRegistered") {
      sorted.sort((a, b) => b.participants - a.participants);
    } else if (sortOption === "campFees") {
      sorted.sort((a, b) => (a.campFees || 0) - (b.campFees || 0));
    } else if (sortOption === "alphabetical") {
      sorted.sort((a, b) => a.campName.localeCompare(b.campName));
    }

    return sorted.reverse();
  }, [filteredCamps, sortOption]);

  const totalPages = Math.ceil(sortedCamps.length / ITEMS_PER_PAGE);
  const paginatedCamps = sortedCamps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100 p-6">
      <h2 className="text-4xl font-bold text-center text-primary mb-8 drop-shadow-md">
        Explore Available Medical Camps
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search camps by name, location, doctor, or date..."
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/3"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="campFees">Camp Fees (Low to High)</option>
          <option value="alphabetical">Alphabetical (Camp Name)</option>
        </select>

        <button
          className="btn btn-outline btn-primary flex items-center gap-2"
          onClick={() => setIsThreeColumn((prev) => !prev)}
          aria-label="Toggle layout"
          title="Toggle layout"
        >
          {isThreeColumn ? (
            <>
              <FaTh /> 2-Column Layout
            </>
          ) : (
            <>
              <FaThLarge /> 3-Column Layout
            </>
          )}
        </button>
      </div>

      <div
        className={`grid gap-8 max-w-7xl mx-auto ${isThreeColumn
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2"
          }`}
      >
        {paginatedCamps.length === 0 ? (
          <p className="text-center col-span-full text-gray-700 text-xl">
            No camps found matching your criteria.
          </p>
        ) : (
          paginatedCamps.map((camp) => (
            <div
              key={camp._id}
              className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden"
            >
              <figure className="h-52">
                <img
                  src={camp.image}
                  alt={camp.campName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body space-y-2">
                <h3 className="text-2xl font-semibold text-primary">
                  {camp.campName}
                </h3>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt />
                  <span>{camp.dateTime}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineMapPin />
                  <span>{camp.location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaUserMd />
                  <span>{camp.healthCare}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers />
                  <span>{camp.participants} participants</span>
                </div>

                <p className="text-gray-700 text-sm mt-3">
                  {camp.description.length > 120
                    ? camp.description.slice(0, 120) + "..."
                    : camp.description}
                </p>

                <div className="mt-4">
                  <Link to={`/camp-details/${camp._id}`}>
                    <button className="btn btn-primary w-full">Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="join">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline"
                  }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCamp;
