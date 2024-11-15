import { useState, useEffect } from "react";
import { useMutation, useStorage } from "@liveblocks/react";

function RequirementsTable() {
  const storage = useStorage((storage) => storage.requirements); // 항상 최상위에서 호출
  const columnWidths = {
    status: 150,
    relatedPage: 150,
    isRequired: 150,
    name: 150,
    description: 300,
    author: 150,
  };
  // 초기 상태 훅 설정
  const [localRequirements, setLocalRequirements] = useState([]);
  // storage가 초기화된 후 requirements 데이터를 로드
  // useEffect(() => {
  //   if (storage && storage.get("requirements")) {
  //     const requirements = storage.get("requirements").toArray();
  //     // setLocalRequirements(requirements);
  //   }
  // }, [storage]);

  // requirements와 columnWidths 가져오기
  // const requirements = storage.root?.get("requirements");
  // const columnWidths = storage.root?.get("columnWidths");

  const handleChange = useMutation(({ storage }, id, field, value) => {
    const requirements = storage.get("requirements");
    const index = requirements.findIndex((req) => req.id === id);
    if (index !== -1) {
      requirements.set(index, { ...requirements.get(index), [field]: value });
      // requirements.set("requirements"); // localRequirements 업데이트
    }
  }, []);

  const handleAddRow = useMutation(({ storage }) => {
    const requirements = storage.get("requirements");
    console.log(requirements.toArray());
    requirements.push({
      id: Date.now(),
      status: "미진행",
      relatedPage: "",
      isRequired: "필수 기능",
      name: "",
      description: "",
      author: "",
    });
    // setLocalRequirements(requirements.toArray()); // localRequirements 업데이트
  }, []);

  // const handleResize = (column, e) => {
  //   const startX = e.clientX;
  //   const startWidth = columnWidths[column];

  //   const onMouseMove = (e) => {
  //     const newWidth = Math.max(startWidth + e.clientX - startX, 50);
  //     columnWidths[column] = newWidth; // 컬럼 너비 업데이트
  //     storage.set("columnWidths", columnWidths);
  //   };

  //   const onMouseUp = () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     document.removeEventListener("mouseup", onMouseUp);
  //   };

  //   document.addEventListener("mousemove", onMouseMove);
  //   document.addEventListener("mouseup", onMouseUp);
  // };
  // storage가 초기화되지 않은 경우 로딩 상태 표시
  if (!storage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Object.keys(columnWidths)?.map((column) => (
              <th
                key={column}
                className="p-1 relative"
                style={{ width: columnWidths[column] }}
              >
                {column === "status" && "구현"}
                {column === "relatedPage" && "관련 페이지"}
                {column === "isRequired" && "필수 여부"}
                {column === "name" && "요구사항 명"}
                {column === "description" && "상세 설명"}
                {column === "author" && "작성자"}
                <span
                  // onMouseDown={(e) => handleResize(column, e)}
                  className="absolute right-0 top-1 h-full cursor-col-resize px-1 text-slate-200"
                  title="너비 조정 가능"
                >
                  &#x22EE;
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {storage.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50">
              <td className="p-2" style={{ width: columnWidths.status }}>
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleChange(req.id, "status", e.target.value)
                  }
                  className="w-full p-1 rounded border-b focus:outline-none"
                >
                  <option value="미진행">미진행</option>
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </td>
              <td className="p-2" style={{ width: columnWidths.relatedPage }}>
                <input
                  type="text"
                  value={req.relatedPage}
                  onChange={(e) =>
                    handleChange(req.id, "relatedPage", e.target.value)
                  }
                  className="w-full p-1 rounded border-b focus:outline-none"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.isRequired }}>
                <select
                  value={req.isRequired}
                  onChange={(e) =>
                    handleChange(req.id, "isRequired", e.target.value)
                  }
                  className="w-full p-1 rounded border-b focus:outline-none"
                >
                  <option value="필수 기능">필수 기능</option>
                  <option value="부가 기능">부가 기능</option>
                </select>
              </td>
              <td className="p-2" style={{ width: columnWidths.name }}>
                <input
                  type="text"
                  value={req.name}
                  onChange={(e) => handleChange(req.id, "name", e.target.value)}
                  className="w-full p-1 rounded border-b focus:outline-none"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.description }}>
                <input
                  type="text"
                  value={req.description}
                  onChange={(e) =>
                    handleChange(req.id, "description", e.target.value)
                  }
                  className="w-full p-1 rounded border-b focus:outline-none"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.author }}>
                <input
                  type="text"
                  value={req.author}
                  onChange={(e) =>
                    handleChange(req.id, "author", e.target.value)
                  }
                  className="w-full p-1 rounded border-b focus:outline-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="mt-4 ms-2 px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
      >
        + 추가하기
      </button>
    </div>
  );
}

export default RequirementsTable;
