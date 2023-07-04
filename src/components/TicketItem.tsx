import { type ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ITicketItemProps {
  data: Record<string, any>
  chooseTickets: (id: number) => void
}

const TicketItem = ({ data, chooseTickets }: ITicketItemProps): ReactElement => {
  return (
    <div>
      {/* <Image src={`/images/destination/${data.flight.arrivalCity}.jpg`} width={200} height={200} loading='lazy' alt={data.flight.arrivalCity}/> */}
      <div>
        <div>
          <span>{data.flight.airline} - {data.classSeat}</span>
          <button>Dropdown</button>
        </div>
        <div>
          <div>
            <span>Waktu Keberangkatan {data.flight.departureTime}</span>
            <span>Durasi Perjalanan {data.flight.duration}</span>
            <span>Waktu Kedatangan {data.flight.arrivalTime}</span>
          </div>
          <div>
            <p>{data.price}</p>
            <button onClick={() => { chooseTickets(data.id) }}>Pilih</button>
          </div>
        </div>
        <span>{data.flight.departureCity}</span>
        <span>{data.flight.arrivalCity}</span>
      </div>
      <div>
        <h2>Detail Penerbangan</h2>
        <div>
          <div>
            <p>{data.flight.departureTime}</p>
            <p>{data.flight.departureDate}</p>
            <p>{data.flight.departureAirport} - {data.flight.departureCity}</p>
          </div>
          <h3>Keberangkatan</h3>
        </div>
        <div>
          <p>{data.flight.airline} - {data.classSeat}</p>
          <p>{data.flight.flightCode}</p>
          {
            data.additionalInformation.split(',').map((info: any, index: number) =>
              <p key={index}>{info}</p>
            )
          }
        </div>
        <div>
          <div>
            <p>{data.flight.arrivalTime}</p>
            <p>{data.flight.arrivalDate}</p>
            <p>{data.flight.arrivalAirport} - {data.flight.arrivalCity}</p>
          </div>
          <h3>Kedatangan</h3>
        </div>
      </div>
    </div>
  )
}

export default TicketItem
