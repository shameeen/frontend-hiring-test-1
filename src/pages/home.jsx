import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import Pagination from "@vlsergey/react-bootstrap-pagination";
import callServcice, { getCalls } from "../services/callService";

const headings = [
  "CALL TYPE",
  "DIRECTION",
  "DURATION",
  "FROM",
  "TO",
  "VIA",
  "CREATED AT",
  "STATUS",
  "ACTIONS",
];

const Home = () => {
  const [calls, setCalls] = useState({
    nodes: [],
    totalCount: 0,
    hasNextPage: false,
  });

  const [filtered, setFiltered] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const handlePageChange = ({ target }) => {
    setPageNumber(target.value);
    fetchCalls(target.value * pageSize, pageSize);
  };

  const fetchCalls = async (offset = 0, limit = 10) => {
    const allCalls = await callServcice.getCalls(offset, limit);
    setCalls(allCalls);
    setFiltered(allCalls.nodes);
  };

  const handleFilter = ({ target }) => {
    const { value } = target;
    if (value === "All") {
      setFiltered(calls.nodes);
    } else if (value === "Archived") {
      const nodes = calls.nodes.filter((item) => item.is_archived === true);
      setFiltered(nodes);
    } else if (value === "Unarchived") {
      const nodes = calls.nodes.filter((item) => item.is_archived === false);
      setFiltered(nodes);
    }
  };

  const handleArchiveToggle = async (data) => {
    try {
      const call = await callServcice.updateCalls(data.id);
      const filteredData = calls.nodes.map((item) =>
        item.id === data.id ? call : item
      );
      setCalls({ ...calls, nodes: filteredData });
      setFiltered(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (data) => {
    setSelectedCall(data);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="display-6">Turing Technologies Fronted Test</h1>

      <div className="d-flex align-itms-center mt-4">
        Filter By:{" "}
        <Form.Select
          className="ms-3 "
          aria-label="Default select example"
          size="sm"
          style={{ width: "100px" }}
          onChange={handleFilter}
        >
          <option value="All">All</option>
          <option value="Archived">Archived</option>
          <option value="Unarchived">Unarchived</option>
        </Form.Select>
      </div>

      <Table bordered hover size="sm" className="mt-4" responsive>
        <thead>
          <tr>
            {headings.map((item, index) => (
              <th className="p-3" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td className="p-3" onClick={() => handleView(item)}>
                {item.call_type}
              </td>
              <td className="p-3">{item.direction}</td>
              <td className="p-3">{item.duration}</td>
              <td className="p-3">{item.from}</td>
              <td className="p-3">{item.to}</td>
              <td className="p-3">{item.via}</td>
              <td className="p-3">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="p-3" onClick={() => handleArchiveToggle(item)}>
                {item.is_archived ? "Archived" : "Unarchived"}
              </td>
              <td className="p-3">
                <Button>Add Note</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        firstPageValue={1}
        value={pageNumber}
        totalPages={Math.floor(calls.totalCount / 10)}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default Home;
