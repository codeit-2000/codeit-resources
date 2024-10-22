// 작성한 서비스 파일 import
import { Schema } from "@repo/backend/amplify/data/resource";
import { createResource } from "@repo/lib/api/resource";
import { generateClient } from "aws-amplify/api";
import React, { useState } from "react";

type RT = "ROOM" | "SEAT" | "EQUIPMENT";

const client = generateClient<Schema>();

function ResourceForm() {
  const [resourceId, setResourceId] = useState("");
  const [resourceType, setResourceType] = useState<RT>("ROOM");
  const [resourceSubtype, setResourceSubtype] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://cafe24.poxo.com/ec01/iglootoy0987/HOvhRhvOk+Cp2KY4JuusAiQvPzUZ2TffTS7V9HOQWJ4E527pmFaAoLqKLAV1cuqFSYaw3CZFsP0mpB0NJqHN8g==/_/web/product/big/202112/a5627ce1ef1612190c6f7d9b10ffaf1e.jpg",
  );

  const handleCreateResource = async () => {
    try {
      const result = await createResource({
        resourceType,
        resourceSubtype,
        name,
        description,
        image,
      });
      console.log("Resource created:", result);
      alert("Resource created successfully");
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  const handleGetResource = async () => {
    try {
      const { data } = await client.models.Resource.get({
        id: resourceId,
      });
      console.log("Resource created:", data);
      alert("Resource created successfully");
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  return (
    <div>
      <h1>Resource Management</h1>

      {/* 리소스 생성/수정 폼 */}
      <div>
        <h2>Create/Update Resource</h2>
        <input
          type="text"
          placeholder="Resource ID (for update/delete)"
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
        />
        <select
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value as RT)}
        >
          <option value="ROOM">Room</option>
          <option value="SEAT">Seat</option>
          <option value="EQUIPMENT">Equipment</option>
        </select>
        <input
          type="text"
          placeholder="Resource Subtype"
          value={resourceSubtype}
          onChange={(e) => setResourceSubtype(e.target.value)}
        />
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" onClick={handleCreateResource}>
          Create Resource
        </button>

        <button type="submit" onClick={handleGetResource}>
          Get Resource
        </button>
      </div>
    </div>
  );
}

export default ResourceForm;
