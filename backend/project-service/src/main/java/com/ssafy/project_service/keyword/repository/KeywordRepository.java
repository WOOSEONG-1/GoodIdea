package com.ssafy.project_service.keyword.repository;

import com.ssafy.project_service.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findAllByMindMap_Id(Long mindMapId);

    @Modifying
    @Query("DELETE FROM Keyword k WHERE k.mindMap.id = :mindMapId")
    void deleteAllByMindMapId(@Param("mindMapId") Long mindMapId);

}
