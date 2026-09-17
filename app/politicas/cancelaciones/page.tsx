export const metadata={title:'Políticas y condiciones'};

export default function Page(){
  return <section className="policy-page">
    <div className="eyebrow">Información para pasajeros</div>
    <h1>Políticas y condiciones</h1>
    <p className="lead">Aquí encontrarás las condiciones generales de reserva, cambios y cancelaciones de nuestros programas y servicios.</p>

    <div className="policy-grid">
      <article>
        <span>6 días o más</span>
        <strong>Sin penalidad</strong>
        <p>Puedes cancelar o modificar tu reserva hasta 6 días antes del primer servicio sin penalidad.</p>
      </article>
      <article>
        <span>Entre 5 y 1 día</span>
        <strong>20% de penalidad</strong>
        <p>Las cancelaciones o modificaciones realizadas entre 5 y 1 día antes del primer servicio tienen un 20% de penalidad por costos administrativos.</p>
      </article>
      <article>
        <span>Menos de 24 horas</span>
        <strong>Primer día sin reembolso</strong>
        <p>Los servicios correspondientes al primer día se cobran en su totalidad. Sobre el resto del programa se aplica una penalidad del 20%.</p>
      </article>
    </div>

    <div className="policy-content">
      <h2>Reservas y pagos</h2>
      <p>La reserva debe ser confirmada con al menos 5 días de anticipación mediante el pago del 100% del valor total del programa.</p>

      <h2>Cancelaciones y modificaciones</h2>
      <p>Los plazos se calculan tomando como referencia el inicio del primer servicio reservado. Cualquier modificación está sujeta a disponibilidad.</p>

      <h2>Condiciones particulares</h2>
      <p>Algunos servicios, entradas, permisos, traslados o experiencias operadas por terceros pueden tener condiciones específicas. Cuando corresponda, estas serán informadas al pasajero en su cotización, confirmación o voucher.</p>

      <h2>¿Necesitas ayuda?</h2>
      <p>Si necesitas modificar o cancelar una reserva, contáctanos indicando el nombre del pasajero y los datos de la reserva para poder ayudarte.</p>
    </div>
  </section>
}
