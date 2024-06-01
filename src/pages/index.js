'use client'
import Image from "next/image";
import useSWR from "swr";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const { data: locationData, isLoading: locationIsLoading } = useSWR('http://localhost:3000/api/v1/locations')
  if (locationIsLoading) return (
    <div>
      Loading ...
    </div>
  )
  const fetchTrafficAndWeatherInfo = (params) => {
    console.log({ params })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100 text-gray-900">
      <div className="max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit(fetchTrafficAndWeatherInfo)}>
          <div className="flex gap-2">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex-1">
              <label htmlFor="date-input" className="block text-sm font-medium text-gray-700">Date input</label>
              <input type="date" id="date-input" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('date', { required: true })}></input>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex-1">
              <label htmlFor="time-input" className="block text-sm font-medium text-gray-700">Time input</label>
              <input type="time" id="time-input" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('time', { required: true })}></input>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <label htmlFor="location-select" className="block text-sm font-medium text-gray-700">Select from list of locations</label>
              <select id="location-select" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('location', { required: true })}>
                {locationData ? locationData.map(location => (
                  <option key={location.id} value={JSON.stringify(location)}>{location.name}</option>
                )) : null}
              </select>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <input type="submit" className="bg-slate-400 rounded-md text-white py-2 px-4 hover:bg-slate-500" value="Get info" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-medium text-gray-700">Display weather result</h2>
            <div className="mt-2 h-32 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Weather data will be displayed here</span>
            </div>
          </div>
        </form>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700">Display traffic screenshot results</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Traffic screenshot 1</span>
            </div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Traffic screenshot 2</span>
            </div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Traffic screenshot 3</span>
            </div>
            <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Traffic screenshot 4</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
