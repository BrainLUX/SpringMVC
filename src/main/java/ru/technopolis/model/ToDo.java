package ru.technopolis.model;

public class ToDo {
    private final long id;
    private final String description;
    private final boolean checked;

    public ToDo(long id, String description, boolean checked) {
        this.id = id;
        this.description = description;
        this.checked = checked;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isChecked() {
        return checked;
    }
}
