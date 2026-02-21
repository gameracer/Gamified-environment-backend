package com.gamified.environment.service;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;

@Service
public class FileStorageService {

    private static final String UPLOAD_DIR = "uploads/lessons/";

    public String storeFile(MultipartFile file) throws Exception {

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
            throw new RuntimeException("Only PDF or DOCX allowed");
        }

        String savedFileName = System.currentTimeMillis() + "_" + fileName;
        Path filePath = Paths.get(UPLOAD_DIR).resolve(savedFileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return savedFileName;
    }

    public String convertDocxToHtml(File file) throws Exception {

        XWPFDocument document = new XWPFDocument(new FileInputStream(file));
        StringBuilder html = new StringBuilder();

        document.getParagraphs().forEach(p ->
                html.append("<p>").append(p.getText()).append("</p>")
        );

        return html.toString();
    }

    public Path getFilePath(String fileName) {
        return Paths.get(UPLOAD_DIR).resolve(fileName);
    }
}
