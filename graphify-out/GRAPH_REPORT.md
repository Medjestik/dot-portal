# Graph Report - src  (2026-09-21)

## Corpus Check
- 230 files · ~71,271 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1257 nodes · 2554 edges · 91 communities (61 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Control Diploma Reports
- Control Webinar Discipline
- Discipline Info Views
- Admin Practice API
- Admin User Popups
- Person Notifications
- API Config Utils
- Accordion UI
- Admin Practice Order Popup
- Semester Item Add Popup
- Control User Add
- Curator Practice
- Person Password Area
- Person Administration
- Control Diploma Report Hub
- Control Webinar Edit
- Curator Diploma
- Control Webinar Add
- Curator Discipline
- Curator View Student
- Discipline Teacher View
- App Shell Handlers
- Semester User Table
- Header Role Icons
- Admin Practice Score
- App Calendar Control
- Teacher Comment Popups
- Discipline Materials User
- Semester Detail Popup
- Control Groups
- Semester List Control
- Person Rating Form
- Documents Library Lists
- Person Diploma Form
- Semester Group Add Popup
- Control User Remove
- Control User Tests
- Teacher Discipline Info
- Person Profile Shell
- Select Components
- Curator Advertisement
- Teacher Group Excel
- Library Normative Lists
- Person Rating Popups
- Diploma Check Control
- Semester Group Control
- Edit Advertisement Popup
- Teacher Semester Header
- Header Navigation Links
- Notifications Widget
- Person Communication Form
- Admin Edit Practice Popup
- Control Report User
- Course Materials Tree
- User Materials List
- Teacher Student Tests
- Person Announcements
- Person Data Form
- Person Education Progress
- User Data Popup
- Discipline Webinar Popup
- User Webinar Popup
- Admin Practice Group Data
- Curator Discipline List
- Teacher Materials List
- Person Achievements
- Person Documents
- Webinar List View
- Date Webinar Popup
- Group Webinar Popup
- Admin Check Diploma Popup
- Control Report Group
- Semester Groups Table
- Course Materials Context
- Discipline User Tasks
- Edit Practice Popup
- Teacher Choose Mark
- Person Declarations
- Admin Edit Student Practice
- Course Item Materials
- Discipline Webinars
- Practice Teacher
- Communication Info Preloader
- Status Webinar Popup
- Curator Group Practice
- Person Webinar Info
- Teacher View Comments
- Section Option Select
- Person Photo Icons

## God Nodes (most connected - your core abstractions)
1. `Popup()` - 58 edges
2. `Table()` - 52 edges
3. `Preloader()` - 47 edges
4. `handleResponse()` - 35 edges
5. `PopupSelect()` - 27 edges
6. `CuratorPractice()` - 25 edges
7. `GetBase64File()` - 25 edges
8. `ControlWebinarEdit()` - 22 edges
9. `Accordion()` - 21 edges
10. `Section()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `handleChangeTask()` --calls--> `GetBase64File()`  [EXTRACTED]
  components/Education/DisciplineUser/DisciplineUserTasks/DisciplineUserTasks.js → custom/GetBase64File.js
- `handleChangeFile()` --calls--> `GetBase64File()`  [EXTRACTED]
  components/Education/EducationPopup/EditAdvertisementPopup/EditAdvertisementPopup.js → custom/GetBase64File.js
- `handleChangeTask()` --calls--> `GetBase64File()`  [EXTRACTED]
  components/Education/PracticeUser/PracticeUserTasks/PracticeUserTasks.js → custom/GetBase64File.js
- `handleChangeDiploma()` --calls--> `GetBase64File()`  [EXTRACTED]
  components/Person/PersonDiploma/PersonDiploma.js → custom/GetBase64File.js
- `handleChangeFile()` --calls--> `GetBase64File()`  [EXTRACTED]
  components/Admin/AdminPopup/AdminAddPracticeOrderPopup/AdminAddPracticeOrderPopup.js → custom/GetBase64File.js

## Import Cycles
- None detected.

## Communities (91 total, 30 thin omitted)

### Community 0 - "Control Diploma Reports"
Cohesion: 0.05
Nodes (34): ControlSemesterData(), countOptions, emptyCount, emptySemester, CourseList(), CuratorGroupList(), CuratorGroupsTable(), CuratorPracticeInfo() (+26 more)

### Community 1 - "Control Webinar Discipline"
Cohesion: 0.06
Nodes (28): ControlWebinarDiscipline(), closePopups(), handleChangeData(), handleChangeSemester(), webinarRequest(), ControlWebinarList(), closePopup(), handleChangeStatus() (+20 more)

### Community 2 - "Discipline Info Views"
Cohesion: 0.07
Nodes (32): DisciplineInfo(), DisciplineUserInfo(), EducationAdvertisement(), PracticeUser(), PracticeUserInfo(), PracticeUserInfo(), PracticeUserTasks(), cleanForm() (+24 more)

### Community 3 - "Admin Practice API"
Cohesion: 0.11
Nodes (35): addPracticeFile(), addPracticeGroupDataManager(), addPracticeGroupDataPlace(), addPracticeGroupDataTask(), addPracticeOrder(), addSemesterItem(), assignPracticeOrder(), checkDiplomaReports() (+27 more)

### Community 4 - "Admin User Popups"
Cohesion: 0.11
Nodes (8): CreateUserPopup(), RemoveUserPopup(), StudentViewAdvertisementPopup(), StudentViewCommentPopup(), StudentViewCommentsPopup(), Popup(), UserPDPopup(), PreloaderPopup()

### Community 5 - "Person Notifications"
Cohesion: 0.08
Nodes (20): PersonNotification(), PersonTeacher(), PersonArea(), PersonWebinar(), changeData(), changePassword(), changePhoto(), changeStudentSocial() (+12 more)

### Community 6 - "API Config Utils"
Cohesion: 0.11
Nodes (30): API_URL, changeData(), changePD(), getCourse(), getCourseMaterials(), handleResponse(), addDiplomaFile(), curatorAddAdvertisement() (+22 more)

### Community 7 - "Accordion UI"
Cohesion: 0.13
Nodes (11): Accordion(), infoIcon, ControlNavigate(), ControlNavigateDiploma(), ControlNavigateGroup(), ControlNavigateReport(), ControlNavigateSemester(), ControlNavigateUser() (+3 more)

### Community 8 - "Admin Practice Order Popup"
Cohesion: 0.10
Nodes (9): AdminAddPracticeOrderPopup(), handleChangeFile(), AddAdvertisementPopup(), handleChangeFile(), PersonAreaPhotoPopup(), handleChangePhoto(), UploadFilePopup(), handleChangeFile() (+1 more)

### Community 9 - "Semester Item Add Popup"
Cohesion: 0.09
Nodes (10): ControlSemesterItemAddPopup(), handleSubmit(), emptyControlForm, emptyCourse, emptyGroup, emptyTutor, ControlSemesterItemEditPopup(), handleSubmit() (+2 more)

### Community 10 - "Control User Add"
Cohesion: 0.09
Nodes (10): ControlUserAdd(), handleSubmit(), HomePage(), Login(), handleSubmit(), getTeacherSemesterInfo(), getUser(), getUserSemesterInfo() (+2 more)

### Community 11 - "Curator Practice"
Cohesion: 0.12
Nodes (13): CuratorPractice(), closePopups(), handleAddFile(), handleAddGroupDataManager(), handleAddGroupDataPlace(), handleAddGroupDataTask(), handleAddOrder(), handleAssignOrder() (+5 more)

### Community 12 - "Person Password Area"
Cohesion: 0.09
Nodes (4): PersonAreaChangePasswordPopup(), PersonAreaDataPopup(), PersonUser(), NotificationPopup()

### Community 13 - "Person Administration"
Cohesion: 0.13
Nodes (6): PersonAdministration(), PersonAdministrationInfoPopup(), PersonArea(), PersonAreaLaptop(), PersonAreaMobile(), PersonNotificationInfoPopup()

### Community 14 - "Control Diploma Report Hub"
Cohesion: 0.27
Nodes (8): ControlDiploma(), ControlReport(), ControlSemester(), ControlUser(), ControlWebinar(), SemesterHeader(), SemesterHeaderBtnBack(), SemesterHeaderNav()

### Community 15 - "Control Webinar Edit"
Cohesion: 0.11
Nodes (6): ControlWebinarEdit(), closePopup(), handleChangeDiscipline(), handleChangeGroup(), handleChangeUser(), handleEditDate()

### Community 16 - "Curator Diploma"
Cohesion: 0.12
Nodes (7): CuratorDiploma(), closePopup(), handleUploadFile(), CuratorDiplomaCheck(), CuratorDiplomaSettings(), CuratorViewReportsPopup(), Tabs()

### Community 17 - "Control Webinar Add"
Cohesion: 0.14
Nodes (6): ControlWebinarAdd(), closePopup(), handleAddDate(), handleChangeDiscipline(), handleChangeGroup(), handleChangeUser()

### Community 18 - "Curator Discipline"
Cohesion: 0.13
Nodes (6): CuratorDiscipline(), addComment(), closeCommentPopup(), closeTeacherPopup(), editComment(), setMark()

### Community 19 - "Curator View Student"
Cohesion: 0.13
Nodes (4): CuratorViewStudentPopup(), AdminFixStatisticPopup(), AdminSetMarkPopup(), TableHorizontal()

### Community 20 - "Discipline Teacher View"
Cohesion: 0.13
Nodes (6): DisciplineTeacher(), addComment(), closeCommentPopup(), closeTeacherPopup(), editComment(), setMark()

### Community 21 - "App Shell Handlers"
Cohesion: 0.15
Nodes (6): App(), handleLogin(), semesterTeacherInfoRequest(), semesterUserInfoRequest(), tokenCheck(), reportWebVitals()

### Community 22 - "Semester User Table"
Cohesion: 0.13
Nodes (6): SemesterUserTable(), PracticeUserTable(), SemesterHeaderWithOptionsUser(), SemesterUser(), chooseSemester(), semesterDataRequest()

### Community 23 - "Header Role Icons"
Cohesion: 0.21
Nodes (13): admissionIcon, controlIcon, curatorIcon, disciplineIcon, documentIcon, educationIcon, journalIcon, libraryIcon (+5 more)

### Community 25 - "App Calendar Control"
Cohesion: 0.14
Nodes (9): Calendar(), { ru }, Control(), Course(), Curator(), Document(), Events(), Journal() (+1 more)

### Community 26 - "Teacher Comment Popups"
Cohesion: 0.22
Nodes (4): TeacherAddCommentPopup(), TeacherEditCommentPopup(), TeacherViewFilesPopup(), ViewStudentPopup()

### Community 27 - "Discipline Materials User"
Cohesion: 0.15
Nodes (6): DisciplineMaterials(), disciplineMaterialRequest(), updateMaterial(), DisciplineUser(), DisciplineUserTeacher(), SectionSelect()

### Community 28 - "Semester Detail Popup"
Cohesion: 0.19
Nodes (8): ViewSemesterDetailPopup(), closePopup(), filterBySemester(), getSemesterDetail(), getStudentMark(), handleFixStatistic(), handleSetMark(), openSetMarkPopup()

### Community 29 - "Control Groups"
Cohesion: 0.26
Nodes (5): ControlGroup(), ControlGroupActive(), ControlGroupCompleted(), ControlGroupTable(), SectionTabs()

### Community 30 - "Semester List Control"
Cohesion: 0.22
Nodes (8): ControlSemesterList(), closePopup(), closeRemovePopup(), dataRequest(), handleAddSemesterItem(), handleEditSemesterItem(), handleRemoveSemesterItem(), handleSetSemester()

### Community 32 - "Documents Library Lists"
Cohesion: 0.29
Nodes (4): DocumentList(), MaterialList(), Month(), Search()

### Community 33 - "Person Diploma Form"
Cohesion: 0.20
Nodes (4): PersonDiploma(), handleChangeDiploma(), PersonDiplomaInfoPopup(), convertDate()

### Community 34 - "Semester Group Add Popup"
Cohesion: 0.22
Nodes (4): ControlSemesterGroupAddPopup(), closeSelect(), handleSaveCourse(), handleSaveTutor()

### Community 36 - "Control User Tests"
Cohesion: 0.24
Nodes (7): ControlUserTest(), closePopup(), coursesRequest(), dataRequest(), handleChangeCourse(), handleChangeUser(), handleDropTestAttempts()

### Community 37 - "Teacher Discipline Info"
Cohesion: 0.25
Nodes (6): DisciplineTeacherInfo(), addAdvertisement(), addMaterial(), closePopup(), editAdvertisement(), removeMaterial()

### Community 38 - "Person Profile Shell"
Cohesion: 0.24
Nodes (5): Person(), closePersonAreaPopup(), handleChangeData(), handleChangePassword(), handleChangePhoto()

### Community 39 - "Select Components"
Cohesion: 0.29
Nodes (3): Select(), TableSelect(), useOnClickOutside()

### Community 40 - "Curator Advertisement"
Cohesion: 0.27
Nodes (5): CuratorAdvertisement(), addAdvertisement(), closePopup(), editAdvertisement(), removeAdvertisement()

### Community 41 - "Teacher Group Excel"
Cohesion: 0.31
Nodes (7): DisciplineTeacherGroup(), handleExportExcel(), buildSheetRows(), exportDisciplineStudentsToExcel(), formatMark(), getLastCommentText(), sanitizeFileNamePart()

### Community 42 - "Library Normative Lists"
Cohesion: 0.31
Nodes (4): LibraryList(), NormativeList(), library, normative

### Community 43 - "Person Rating Popups"
Cohesion: 0.22
Nodes (3): PersonRatingInfoPopup(), PersonRatingSelect(), StarRating()

### Community 44 - "Diploma Check Control"
Cohesion: 0.28
Nodes (5): ControlDiplomaCheck(), closePopup(), dataRequest(), handleChangeDiplomaCheck(), handleSetYear()

### Community 45 - "Semester Group Control"
Cohesion: 0.28
Nodes (5): ControlSemesterGroup(), closePopup(), closeRemovePopup(), handleCreateSemesterGroup(), handleRemoveGroupSemester()

### Community 47 - "Teacher Semester Header"
Cohesion: 0.28
Nodes (4): SemesterHeaderWithOptionsTeacher(), SemesterTeacher(), chooseSemester(), disciplineRequest()

### Community 49 - "Notifications Widget"
Cohesion: 0.28
Nodes (5): Notifications(), handleOpenNotificationPopup(), renderNotifications(), newTypes, types

### Community 52 - "Control Report User"
Cohesion: 0.32
Nodes (5): ControlReportUser(), coursesRequest(), dataRequest(), handleChangeCourse(), handleChangeUser()

### Community 53 - "Course Materials Tree"
Cohesion: 0.43
Nodes (8): CourseMaterials(), convertArr(), getChildren(), renderMaterialBtn(), renderMaterialIcon(), renderMaterials(), renderMaterialStatus(), renderTestExportBtn()

### Community 54 - "User Materials List"
Cohesion: 0.39
Nodes (7): DisciplineUserMaterialsList(), convertArr(), getChildren(), renderMaterialBtn(), renderMaterialIcon(), renderMaterials(), renderMaterialStatus()

### Community 55 - "Teacher Student Tests"
Cohesion: 0.32
Nodes (3): DisciplineTeacherStudent(), TeacherViewTestsPopup(), TestChart()

### Community 60 - "Discipline Webinar Popup"
Cohesion: 0.29
Nodes (3): DisciplineWebinarPopup(), handleSearch(), handleSubmit()

### Community 61 - "User Webinar Popup"
Cohesion: 0.29
Nodes (3): UserWebinarPopup(), handleSearch(), handleSubmit()

### Community 64 - "Teacher Materials List"
Cohesion: 0.43
Nodes (6): DisciplineTeacherMaterialsList(), convertArr(), getChildren(), renderMaterialBtn(), renderMaterialIcon(), renderMaterials()

### Community 68 - "Date Webinar Popup"
Cohesion: 0.33
Nodes (3): DateWebinarPopup(), handleSearch(), handleSubmit()

### Community 69 - "Group Webinar Popup"
Cohesion: 0.33
Nodes (3): GroupWebinarPopup(), handleSearch(), handleSubmit()

### Community 71 - "Control Report Group"
Cohesion: 0.47
Nodes (5): ControlReportGroup(), coursesRequest(), dataRequest(), handleChangeCourse(), handleChangeGroup()

### Community 72 - "Semester Groups Table"
Cohesion: 0.40
Nodes (3): ControlSemesterGroups(), tabs, ControlSemesterGroupsTable()

### Community 74 - "Discipline User Tasks"
Cohesion: 0.40
Nodes (4): DisciplineUserTasks(), cleanForm(), disciplineTasksUpload(), handleChangeTask()

### Community 79 - "Course Item Materials"
Cohesion: 0.50
Nodes (3): CourseItem(), disciplineMaterialRequest(), updateMaterial()

### Community 81 - "Practice Teacher"
Cohesion: 0.50
Nodes (3): PracticeTeacher(), closePopup(), handleEditPractice()

## Knowledge Gaps
- **11 isolated node(s):** `{ ru }`, `tabs`, `emptySemester`, `emptyCount`, `countOptions` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Preloader()` connect `Control Diploma Reports` to `Discipline Info Views`, `Person Notifications`, `Semester Groups Table`, `Course Materials Context`, `Person Password Area`, `Person Administration`, `Control Diploma Report Hub`, `Teacher Semester Header`, `Curator Diploma`, `Notifications Widget`, `Semester User Table`, `Teacher Student Tests`, `Admin Practice Score`, `Teacher Comment Popups`, `Discipline Materials User`, `Control Groups`, `Curator Discipline List`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `Popup()` connect `Admin User Popups` to `Control Diploma Reports`, `Control Webinar Discipline`, `Accordion UI`, `Admin Practice Order Popup`, `Semester Item Add Popup`, `Person Password Area`, `Person Administration`, `Curator View Student`, `Admin Practice Score`, `Teacher Comment Popups`, `Select Components`, `Admin Edit Practice Popup`, `Teacher Student Tests`, `Person Announcements`, `Person Data Form`, `Person Education Progress`, `User Data Popup`, `Admin Practice Group Data`, `Person Achievements`, `Admin Check Diploma Popup`, `Course Materials Context`, `Edit Practice Popup`, `Teacher Choose Mark`, `Person Webinar Info`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `CuratorPractice()` connect `Curator Practice` to `Control Diploma Reports`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `{ ru }`, `tabs`, `emptySemester` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Control Diploma Reports` be split into smaller, more focused modules?**
  _Cohesion score 0.05274725274725275 - nodes in this community are weakly interconnected._
- **Should `Control Webinar Discipline` be split into smaller, more focused modules?**
  _Cohesion score 0.05647058823529412 - nodes in this community are weakly interconnected._
- **Should `Discipline Info Views` be split into smaller, more focused modules?**
  _Cohesion score 0.06717687074829932 - nodes in this community are weakly interconnected._