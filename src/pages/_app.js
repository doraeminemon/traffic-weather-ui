import dynamic from "next/dynamic";
import '@/styles/globals.css'

const DynamicSwrConfig = dynamic(() => import('swr').then(swr => swr.SWRConfig), { loading: () => <p>Loading...</p> })

export default function App({ Component, pageProps }) {
  return (
    <DynamicSwrConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <Component {...pageProps} />
    </DynamicSwrConfig>
  )
}