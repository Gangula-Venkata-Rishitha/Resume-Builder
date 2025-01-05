document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const downloadPDF = document.getElementById('downloadPDF');
    
    // Add Education Field
    document.getElementById('addEducation').addEventListener('click', function() {
        const educationFields = document.getElementById('educationFields');
        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <input type="text" class="degree" placeholder="Degree/Certification">
            <input type="text" class="institution" placeholder="Institution Name">
            <div class="date-group">
                <input type="text" class="start-date" placeholder="Start Date">
                <input type="text" class="end-date" placeholder="End Date">
            </div>
            <input type="text" class="percentage" placeholder="GPA/Percentage">
        `;
        educationFields.appendChild(newEducation);
    });

    // Add Experience Field
    document.getElementById('addExperience').addEventListener('click', function() {
        const experienceFields = document.getElementById('experienceFields');
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <input type="text" class="company" placeholder="Company Name">
            <input type="text" class="position" placeholder="Job Title">
            <div class="date-group">
                <input type="text" class="start-date" placeholder="Start Date">
                <input type="text" class="end-date" placeholder="End Date">
            </div>
            <textarea class="responsibilities" placeholder="• Use bullet points to describe your achievements&#10;• Start with action verbs&#10;• Include metrics where possible"></textarea>
        `;
        experienceFields.appendChild(newExperience);
    });

    // Add Project Field
    document.getElementById('addProject').addEventListener('click', function() {
        const projectFields = document.getElementById('projectFields');
        const newProject = document.createElement('div');
        newProject.className = 'project-entry';
        newProject.innerHTML = `
            <input type="text" class="projectName" placeholder="Project Name">
            <input type="text" class="projectTech" placeholder="Technologies Used">
            <textarea class="projectDescription" placeholder="• Describe the problem solved&#10;• Mention technologies used&#10;• Highlight key achievements"></textarea>
        `;
        projectFields.appendChild(newProject);
    });

    // Generate Resume
    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            email: document.getElementById('email').value,
            linkedin: document.getElementById('linkedin').value,
            portfolio: document.getElementById('portfolio').value,
            objective: document.getElementById('objective').value,
            education: Array.from(document.getElementsByClassName('education-entry')).map(entry => ({
                degree: entry.querySelector('.degree').value,
                institution: entry.querySelector('.institution').value,
                startDate: entry.querySelector('.start-date').value,
                endDate: entry.querySelector('.end-date').value,
                percentage: entry.querySelector('.percentage').value
            })),
            skills: {
                programming: document.getElementById('programmingLanguages').value,
                webDev: document.getElementById('webDevelopment').value,
                core: document.getElementById('coreSkills').value,
                soft: document.getElementById('softSkills').value
            },
            experience: Array.from(document.getElementsByClassName('experience-entry')).map(entry => ({
                company: entry.querySelector('.company').value,
                position: entry.querySelector('.position').value,
                startDate: entry.querySelector('.start-date').value,
                endDate: entry.querySelector('.end-date').value,
                responsibilities: entry.querySelector('.responsibilities').value
            })),
            projects: Array.from(document.getElementsByClassName('project-entry')).map(entry => ({
                name: entry.querySelector('.projectName').value,
                tech: entry.querySelector('.projectTech').value,
                description: entry.querySelector('.projectDescription').value
            }))
        };

        // Generate resume HTML
        const resumeHTML = `
            <h1>${formData.fullName}</h1>
            <div class="contact-info">
                ${formData.phone} • ${formData.location}<br>
                ${formData.email}
                ${formData.linkedin ? `<br><a href="${formData.linkedin}" target="_blank">LinkedIn</a>` : ''}
                ${formData.portfolio ? ` • <a href="${formData.portfolio}" target="_blank">Portfolio</a>` : ''}
            </div>

            <div class="section">
                <div class="section-title">PROFESSIONAL SUMMARY</div>
                <p>${formData.objective}</p>
            </div>

            <div class="section">
                <div class="section-title">TECHNICAL SKILLS</div>
                <div class="skills-grid">
                    <div><strong>Programming:</strong> ${formData.skills.programming}</div>
                    <div><strong>Web Technologies:</strong> ${formData.skills.webDev}</div>
                    <div><strong>Tools & Frameworks:</strong> ${formData.skills.core}</div>
                    <div><strong>Soft Skills:</strong> ${formData.skills.soft}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">PROFESSIONAL EXPERIENCE</div>
                ${formData.experience.map(exp => `
                    <div class="experience-item">
                        <strong>${exp.position}</strong> | ${exp.company}
                        <br>
                        <em>${exp.startDate} - ${exp.endDate}</em>
                        <br>
                        ${exp.responsibilities.split('\n').map(resp => `<p>${resp}</p>`).join('')}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <div class="section-title">PROJECTS</div>
                ${formData.projects.map(proj => `
                    <div class="project-item">
                        <strong>${proj.name}</strong> | ${proj.tech}
                        <br>
                        ${proj.description.split('\n').map(desc => `<p>${desc}</p>`).join('')}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <div class="section-title">EDUCATION</div>
                ${formData.education.map(edu => `
                    <div class="education-item">
                        <strong>${edu.degree}</strong>
                        <br>
                        ${edu.institution}
                        <br>
                        <em>${edu.startDate} - ${edu.endDate}</em>
                        ${edu.percentage ? `<br>GPA/Percentage: ${edu.percentage}` : ''}
                    </div>
                `).join('')}
            </div>
        `;

        // Update preview
        resumePreview.innerHTML = resumeHTML;
    });

    // Download PDF
    downloadPDF.addEventListener('click', function() {
        const element = resumePreview;
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf().set(opt).from(element).save();
    });
});
