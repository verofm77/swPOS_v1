import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import {
  ListOrderAdmin

} from "../../components/Admin/TableDetails";
import { useOrder, useTable } from "../../hooks";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => getTable(id), [id]);

  

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

      


  return (
    <>
      <HeaderPage
        title={`Mesa # ${table?.number || ""}`}
        btnTitle="Agregar Pedido"
        btnClick={openCloseModal}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

        <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title="Generar pedido"
        >
            <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        </ModalBasic>  
    </>
  );
  
}