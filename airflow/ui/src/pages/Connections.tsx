/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Box, Heading } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";

import { useConnectionServiceGetConnections } from "openapi/queries";
import type { ConnectionResponse } from "openapi/requests/types.gen";
import { DataTable } from "src/components/DataTable";
import { ErrorAlert } from "src/components/ErrorAlert";

const columns: Array<ColumnDef<ConnectionResponse>> = [
  {
    accessorKey: "connection_id",
    enableSorting: true,
    header: "Connection Id",
  },
  {
    accessorKey: "conn_type",
    enableSorting: true,
    header: "Connection Type",
  },
  {
    accessorKey: "description",
    enableSorting: false,
    header: "Description",
  },
];

export const Connections = () => {
  const { data, error } = useConnectionServiceGetConnections();

  return (
    <Box p={2}>
      <Heading>Connections</Heading>
      <DataTable
        columns={columns}
        data={data?.connections ?? []}
        errorMessage={<ErrorAlert error={error} />}
        total={data?.total_entries}
      />
    </Box>
  );
};
