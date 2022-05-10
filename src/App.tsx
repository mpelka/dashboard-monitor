import axios, { AxiosResponse } from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Application, ApplicationPartial } from "./types";

const baseUrl = "https://api.recruitment.4soft.tech";
const listUrl = `${baseUrl}/list`;
const detailsUrl = (id: string) => `${baseUrl}/details/${id}`;

function AppDetails() {
  const { id } = useParams();
  const { data, refetch, isSuccess, isFetching } = useQuery<AxiosResponse, unknown, Application>(
    ["details", id],
    () => axios.get(detailsUrl(id!)),
    {
      select: (res) => res.data,
    },
  );

  if (data && isSuccess) {
    return (
      <div className="p-12 gap-4">
        <div className=" bg-white rounded-md shadow-sm p-4 cursor-pointer mb-10">
          <header className="flex items-center  mb-8">
            <img className="w-12 h-12 mr-4" src={data.logo} />
            <div>
              <div className="text-xl text-gray-800 py-2">{data.name}</div>
              <div className="text-sm text-gray-500">{data.company}</div>
            </div>
          </header>

          <div className="mb-4">
            <div className="text-gray-600 font-semibold">Number Of Active Users</div>
            <div className="text-sm text-gray-500">{data.number_of_active_users}</div>
          </div>
          <div className="mb-4">
            <div className="text-gray-600 font-semibold">Number Of Users</div>
            <div className="text-sm text-gray-500">{data.number_of_users}</div>
          </div>
          <div className="mb-4">
            <div className="text-gray-600 font-semibold">Server Address</div>
            <div className="text-sm text-gray-500">{data.server_address}</div>
          </div>
        </div>

        <button
          className="p-3 bg-blue-500 w-full mt-4 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => refetch()}
        >
          Refresh
        </button>
      </div>
    );
  }

  if (data && isFetching) {
    return <div>Loading</div>;
  }

  return <div>Error</div>;
}

function AppList() {
  const { data } = useQuery<AxiosResponse, unknown, ApplicationPartial[]>(["list"], () => axios.get(listUrl), {
    select: (res) => res.data,
  });

  return (
    <div className="p-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.map((item) => (
        <Link to={`details/${item.id}`}>
          <div className=" bg-white rounded-md shadow-sm p-4 cursor-pointer" key={item.id}>
            <div className="text-xl text-gray-800 py-2">{item.name}</div>
            <div className="text-sm text-gray-500">{item.company}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppList />} />
      <Route path="/details/:id" element={<AppDetails />} />
    </Routes>
  );
}
