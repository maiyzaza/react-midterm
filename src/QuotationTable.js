import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);
  const [totalLastPice, setTotalLastPice] = useState(0);

  useEffect(() => {

    let discount = 0
    let discountTotal = 0

    const dataRow = data.map((v, i) => {

      let amount = v.qty * v.ppu
      let amountDiscount = v.dis * 1
      let amountDiscountPerUnit = amount - amountDiscount

      discountTotal += amountDiscount
      
      discount += amountDiscountPerUnit

      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style={styles.textRight}>{numberWithCommas(amountDiscount)}</td>
          <td style={styles.textRight}>{numberWithCommas(amount - amountDiscount)}</td>
        </tr>
      );
    });
    
    setDataRows(dataRow)
    setTotalPriceDiscount(discountTotal)
    setTotalLastPice(discount)
  }, [data])

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([])
    setDataRows([])
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Quotation Table</h1>
        </Col>
        <Col style={styles.textRight}>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th style={styles.textCenter}>Qty</th>
            <th style={styles.textCenter}>Item</th>
            <th style={styles.textCenter}>Price/Unit</th>
            <th style={styles.textCenter}>Discount</th>
            <th style={styles.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
        <tr>
          <th colSpan={4}></th>
            <th style={styles.textCenter}>Total Discount</th>
            <th style={styles.textRight}>{numberWithCommas(totalPriceDiscount)}</th>
          </tr>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(totalLastPice)}</th>
          </tr>
          
        </tfoot>
      </Table>
        <Button onClick={clearTable} variant="dark">
          Clear
        </Button>
    </Container>
  );
}

export default QuotationTable;
