const Sequelize = require('sequelize');
var sequelize = new Sequelize('d5e3kmgj3fosms', 'wdnkhdurgsgopd', 'a0d261ee90c510d7f88f26c57950cf5b99b60f1d2daaeb36a2d3d851c8a181fb', {
    host: 'ec2-52-203-118-49.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
    ssl: true
    }
   });

   const Student = sequelize.define('student', {
    studId: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    program:Sequelize.STRING,
    gpa:Sequelize.FLOAT,


   });

   exports.initialize = () => {
    return new Promise((resolve,reject) => {
        sequelize.sync()
        .then(resolve('database synced'))
        .catch(reject('unable to sync the database'));
    })
};


exports.prep = ()=>{
    return new Promise((resolve,reject) => {
        sequelize.sync()
        .then(resolve(Student.findAll()))
        .catch(reject('no results returned'));
    })
};

exports.bsd = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "BSD");
       (results.length == 0)? reject("No BSD students."):resolve(results);
    });
}


exports.cpa = ()=>{
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                program: "CPA"
            }
        }).then(data => {
            resolve(data)
        }).catch(err => reject("no results returned"))
    });

}

exports.lowGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let low = 4.0;
        let lowStudent;
        for (let i=0; i<students.length; i++)
        {
            if (students[i].gpa < low)
            {
                low = students[i].gpa;
                lowStudent = students[i];
            }
        }
        resolve(lowStudent);
    }); 
};

exports.allStudents =()=>{
    return new Promise((resolve, reject)=>{
        if (students.length>0)
        {
            resolve(students);
        } else reject("No students.");
    })
}

exports.addStudent= (stud)=>{
    return new Promise((resolve,reject) => {
        for (var i in stud) {
            if (stud[i] == "") { stud[i] = null; }
        }
    
        Student.create(stud)
        .then(resolve(Student.findAll()))
        .catch(reject('unable to add Student'))
    })
};



exports.highGPA = () => {

    return new Promise((resolve, reject) => {
        let high_GPA = 0;
        let hStudent;
        Student.findAll().then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].gpa > high_GPA) {
                    high_GPA = data[i].gpa;
                    Student = data[i];
                }
            }
            (hStudent) ? resolve(hStudent) : reject("no results returned");
        }).catch(err => {
            reject("no results returned")
        })
    });

};

exports.getStudent = (studId)=>{
    return new Promise((resolve, reject)=>{
        students.forEach(function(student){
            if (student.studId == studId)
                resolve(student);
        });
        reject("No result found!");
    })
}
