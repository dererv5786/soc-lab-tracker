// ==========================================
// DERICK ERVIN - SOC LAB TRACKER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const labCards = document.querySelectorAll(".lab-card");

    const totalLabsElement = document.getElementById("totalLabs");
    const completedLabsElement = document.getElementById("completedLabs");
    const wipLabsElement = document.getElementById("wipLabs");
    const labHoursElement = document.getElementById("labHours");
    const progressPercentElement = document.getElementById("progressPercent");
    const progressFillElement = document.getElementById("progressFill");


    // ------------------------------------------
    // LOAD SAVED LAB STATUS
    // ------------------------------------------

    labCards.forEach((card, index) => {

        const savedStatus =
            localStorage.getItem(`socLabStatus-${index}`) || "not-started";

        setLabStatus(card, savedStatus, index);


        // NOT STARTED BUTTON
        const notStartedButton =
            card.querySelector(".not-started");

        notStartedButton.addEventListener("click", () => {

            setLabStatus(card, "not-started", index);
            updateDashboard();

        });


        // WIP BUTTON
        const wipButton =
            card.querySelector(".wip");

        wipButton.addEventListener("click", () => {

            setLabStatus(card, "wip", index);
            updateDashboard();

        });


        // DONE BUTTON
        const doneButton =
            card.querySelector(".done");

        doneButton.addEventListener("click", () => {

            setLabStatus(card, "done", index);
            updateDashboard();

        });

    });


    // ------------------------------------------
    // SET LAB STATUS
    // ------------------------------------------

    function setLabStatus(card, status, index) {

        const buttons =
            card.querySelectorAll(".status-btn");

        buttons.forEach(button => {

            button.classList.remove(
                "active-not-started",
                "active-wip",
                "active-done"
            );

        });


        card.classList.remove("completed");


        if (status === "not-started") {

            card.querySelector(".not-started")
                .classList.add("active-not-started");

        }


        if (status === "wip") {

            card.querySelector(".wip")
                .classList.add("active-wip");

        }


        if (status === "done") {

            card.querySelector(".done")
                .classList.add("active-done");

            card.classList.add("completed");

        }


        card.dataset.status = status;


        // Save status in browser
        localStorage.setItem(
            `socLabStatus-${index}`,
            status
        );

    }


    // ------------------------------------------
    // UPDATE DASHBOARD
    // ------------------------------------------

    function updateDashboard() {

        let completed = 0;
        let wip = 0;
        let completedHours = 0;


        labCards.forEach(card => {

            const status = card.dataset.status;

            const hours =
                parseInt(card.dataset.hours) || 0;


            if (status === "done") {

                completed++;
                completedHours += hours;

            }


            if (status === "wip") {

                wip++;

            }

        });


        const totalLabs = labCards.length;


        let progress = 0;

        if (totalLabs > 0) {

            progress =
                Math.round(
                    (completed / totalLabs) * 100
                );

        }


        // Update numbers
        totalLabsElement.textContent =
            totalLabs;

        completedLabsElement.textContent =
            completed;

        wipLabsElement.textContent =
            wip;

        labHoursElement.textContent =
            completedHours + "+";

        progressPercentElement.textContent =
            progress + "%";

        progressFillElement.style.width =
            progress + "%";

    }


    // Initial dashboard update
    updateDashboard();

});
